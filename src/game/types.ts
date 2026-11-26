export type GamePhase = 'lobby' | 'play' | 'results';

export type Category = {
  id: string;
  label: string;
};

export type Player = {
  id: string;
  name: string;
  color: string;
  isHost: boolean;
  isYou: boolean;
  isNpc: boolean;
};

export type GameSettings = {
  categoryCount: 6 | 8 | 12;
  roundSeconds: 0 | 60 | 90;
};

export type Answers = Record<string, Record<string, string>>;

export type ScoreReason = 'empty' | 'invalid' | 'unique' | 'shared';

export type CategoryScore = {
  categoryId: string;
  playerId: string;
  answer: string;
  points: number;
  reason: ScoreReason;
};

export type RoundScore = {
  breakdown: CategoryScore[];
  totals: Record<string, number>;
};

export type Game = {
  code: string;
  phase: GamePhase;
  letter: string;
  players: Player[];
  categories: Category[];
  settings: GameSettings;
  answers: Answers;
  score: RoundScore | null;
  roundNumber: number;
};
