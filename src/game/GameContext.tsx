import { router } from 'expo-router';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { avatarPalette } from '@/theme';

import { CATEGORIES, createId, randomCode, randomLetter, shuffle } from './catalog';
import { generateNpcAnswers } from './npc';
import { scoreRound } from './scoring';
import type { Game, GameSettings, Player } from './types';

const defaultSettings: GameSettings = {
  categoryCount: 8,
  roundSeconds: 60,
};

type GameContextValue = {
  playerName: string;
  setPlayerName: (name: string) => void;
  game: Game | null;
  createGame: () => boolean;
  joinGame: (code: string) => boolean;
  updateSettings: (settings: Partial<GameSettings>) => void;
  startRound: () => void;
  setAnswer: (categoryId: string, value: string) => void;
  finishRound: () => void;
  playAgain: () => void;
  leaveGame: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

function youPlayer(name: string, isHost: boolean): Player {
  return {
    id: 'you',
    name: name.trim(),
    color: avatarPalette[0],
    isHost,
    isYou: true,
    isNpc: false,
  };
}

function npcPlayers(names: string[], startIndex: number, hostId?: string): Player[] {
  return names.map((name, index) => ({
    id: createId('npc'),
    name,
    color: avatarPalette[(startIndex + index) % avatarPalette.length],
    isHost: hostId === name,
    isYou: false,
    isNpc: true,
  }));
}

function selectCategories(count: GameSettings['categoryCount']) {
  return shuffle(CATEGORIES).slice(0, count);
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerName] = useState('');
  const [game, setGame] = useState<Game | null>(null);

  const value = useMemo<GameContextValue>(() => ({
    playerName,
    setPlayerName,
    game,
    createGame: () => {
      const name = playerName.trim();
      if (name.length < 2) return false;

      setGame({
        code: randomCode(),
        phase: 'lobby',
        letter: randomLetter(),
        players: [youPlayer(name, true), ...npcPlayers(['Maya', 'Jules', 'Theo'], 1)],
        categories: selectCategories(defaultSettings.categoryCount),
        settings: defaultSettings,
        answers: { you: {} },
        score: null,
        roundNumber: 1,
      });
      return true;
    },
    joinGame: (code) => {
      const name = playerName.trim();
      const trimmedCode = code.trim().toUpperCase();
      if (name.length < 2 || !/^[A-Z]{4}$/.test(trimmedCode)) return false;

      setGame({
        code: trimmedCode,
        phase: 'lobby',
        letter: randomLetter(),
        players: [
          ...npcPlayers(['Riley'], 2, 'Riley').map((player) => ({ ...player, isHost: true })),
          youPlayer(name, false),
          ...npcPlayers(['Noor', 'Ellis'], 3),
        ],
        categories: selectCategories(defaultSettings.categoryCount),
        settings: defaultSettings,
        answers: { you: {} },
        score: null,
        roundNumber: 1,
      });
      return true;
    },
    updateSettings: (settings) => {
      setGame((current) => {
        if (!current || current.phase !== 'lobby') return current;
        const nextSettings = { ...current.settings, ...settings };
        return {
          ...current,
          settings: nextSettings,
          categories:
            settings.categoryCount && settings.categoryCount !== current.settings.categoryCount
              ? selectCategories(settings.categoryCount)
              : current.categories,
        };
      });
    },
    startRound: () => {
      setGame((current) => {
        if (!current) return current;
        return {
          ...current,
          phase: 'play',
          letter: randomLetter(current.letter),
          answers: Object.fromEntries(current.players.map((player) => [player.id, {}])),
          score: null,
        };
      });
    },
    setAnswer: (categoryId, value) => {
      setGame((current) => {
        if (!current || current.phase !== 'play') return current;
        return {
          ...current,
          answers: {
            ...current.answers,
            you: {
              ...current.answers.you,
              [categoryId]: value,
            },
          },
        };
      });
    },
    finishRound: () => {
      setGame((current) => {
        if (!current || current.phase !== 'play') return current;
        const npcAnswers = generateNpcAnswers(
          current.players,
          current.categories,
          current.letter,
          current.answers.you ?? {},
        );
        const answers = {
          ...current.answers,
          ...npcAnswers,
        };
        const scored = { ...current, answers, phase: 'results' as const };
        return {
          ...scored,
          score: scoreRound(scored),
        };
      });
    },
    playAgain: () => {
      setGame((current) => {
        if (!current) return current;
        return {
          ...current,
          phase: 'lobby',
          answers: Object.fromEntries(current.players.map((player) => [player.id, {}])),
          score: null,
          roundNumber: current.roundNumber + 1,
        };
      });
    },
    leaveGame: () => {
      setGame(null);
      router.replace('/');
    },
  }), [game, playerName]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const value = useContext(GameContext);
  if (!value) {
    throw new Error('useGame must be used within GameProvider');
  }
  return value;
}
