import { Redirect } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { LetterTile } from '@/components/LetterTile';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useGame } from '@/game/GameContext';
import type { Game } from '@/game/types';
import { layout, spacing } from '@/theme';

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${mins}:${rest.toString().padStart(2, '0')}`;
}

export default function PlayScreen() {
  const { game } = useGame();

  if (!game) return <Redirect href="/" />;
  if (game.phase === 'lobby') return <Redirect href="/lobby" />;
  if (game.phase === 'results') return <Redirect href="/results" />;

  return <PlayRound key={`${game.code}-${game.roundNumber}`} game={game} />;
}

function PlayRound({ game }: { game: Game }) {
  const { setAnswer, finishRound } = useGame();
  const { width } = useWindowDimensions();
  const wide = width >= layout.wideBreakpoint;
  const duration = game.settings.roundSeconds;
  const [remaining, setRemaining] = useState<number | null>(duration || null);
  const endingRef = useRef(false);

  const endRound = () => {
    if (endingRef.current) return;
    endingRef.current = true;
    finishRound();
  };

  useEffect(() => {
    if (!duration) return undefined;
    const timer = setInterval(() => {
      setRemaining((current) => {
        if (current == null || current <= 1) {
          clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [duration]);

  const filled = useMemo(
    () => game.categories.filter((category) => (game.answers.you?.[category.id] ?? '').trim()).length,
    [game],
  );

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <View style={[styles.top, wide && styles.topWide]}>
          <View style={styles.letterCol}>
            <AppText variant="label">
              Round {game.roundNumber}
              {duration > 0 && remaining != null ? ` · ${formatTime(remaining)}` : ''}
            </AppText>
            <LetterTile letter={game.letter} size={wide ? 160 : 120} />
            <AppText variant="caption" style={styles.hint}>
              Every answer must start with {game.letter}. Unique answers are worth 2, shared answers 1.
            </AppText>
          </View>

          <View style={styles.form}>
            {game.categories.map((category) => (
              <TextField
                key={category.id}
                label={category.label}
                placeholder={`Starts with ${game.letter}`}
                autoCapitalize="words"
                value={game.answers.you?.[category.id] ?? ''}
                onChangeText={(value) => setAnswer(category.id, value)}
              />
            ))}
          </View>
        </View>

        <Button
          label={
            duration > 0 && remaining === 0
              ? 'Time’s up · reveal scores'
              : `Finish round · ${filled}/${game.categories.length}`
          }
          onPress={endRound}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  top: {
    gap: spacing.lg,
  },
  topWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  letterCol: {
    gap: spacing.md,
    minWidth: 180,
  },
  hint: {
    maxWidth: 240,
  },
  form: {
    flex: 1,
    gap: spacing.md,
  },
});
