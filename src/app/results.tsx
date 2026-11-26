import { Redirect } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { LetterTile } from '@/components/LetterTile';
import { Screen } from '@/components/Screen';
import { useGame } from '@/game/GameContext';
import type { ScoreReason } from '@/game/types';
import { colors, radius, spacing } from '@/theme';

const reasonCopy: Record<ScoreReason, string> = {
  unique: '+2 unique',
  shared: '+1 shared',
  invalid: 'needs the letter',
  empty: 'blank',
};

export default function ResultsScreen() {
  const { game, playAgain, leaveGame } = useGame();

  const ranked = useMemo(() => {
    if (!game?.score) return [];
    return [...game.players].sort((a, b) => (game.score?.totals[b.id] ?? 0) - (game.score?.totals[a.id] ?? 0));
  }, [game]);

  if (!game) return <Redirect href="/" />;
  if (game.phase === 'lobby') return <Redirect href="/lobby" />;
  if (game.phase === 'play') return <Redirect href="/play" />;
  if (!game.score) return <Redirect href="/lobby" />;

  return (
    <Screen>
      <View style={styles.header}>
        <LetterTile letter={game.letter} size={72} />
        <View style={styles.headerCopy}>
          <AppText variant="label">Round {game.roundNumber} up</AppText>
          <AppText variant="title">Who owned the letter?</AppText>
        </View>
      </View>

      <View style={styles.board}>
        {ranked.map((player, index) => (
          <View key={player.id} style={styles.rankRow}>
            <AppText variant="stat" style={styles.place}>
              {index + 1}
            </AppText>
            <Avatar player={player} size={40} />
            <AppText style={styles.rankName} numberOfLines={1}>
              {player.name}
              {player.isYou ? ' · you' : ''}
            </AppText>
            <AppText variant="stat">{game.score?.totals[player.id] ?? 0}</AppText>
          </View>
        ))}
      </View>

      {game.categories.map((category) => (
        <View key={category.id} style={styles.category}>
          <AppText variant="label">{category.label}</AppText>
          {game.players.map((player) => {
            const row = game.score?.breakdown.find(
              (item) => item.categoryId === category.id && item.playerId === player.id,
            );
            return (
              <View key={player.id} style={styles.answerRow}>
                <Avatar player={player} size={28} />
                <View style={styles.answerCopy}>
                  <AppText numberOfLines={1}>{row?.answer.trim() || '—'}</AppText>
                  <AppText variant="caption">{reasonCopy[row?.reason ?? 'empty']}</AppText>
                </View>
                <AppText variant="stat" style={row?.points ? styles.pointsOn : styles.pointsOff}>
                  {row?.points ?? 0}
                </AppText>
              </View>
            );
          })}
        </View>
      ))}

      <View style={styles.actions}>
        <Button label="Play another round" onPress={playAgain} />
        <Button label="Back home" variant="secondary" onPress={leaveGame} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: 4,
  },
  board: {
    backgroundColor: colors.inkElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    gap: spacing.sm,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  place: {
    width: 24,
    color: colors.gold,
  },
  rankName: {
    flex: 1,
  },
  category: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  answerCopy: {
    flex: 1,
    minWidth: 0,
  },
  pointsOn: {
    color: colors.mint,
  },
  pointsOff: {
    color: colors.muted,
  },
  actions: {
    gap: spacing.sm,
  },
});
