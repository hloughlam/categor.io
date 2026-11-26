import { Redirect } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { PlayerCard } from '@/components/PlayerCard';
import { Screen } from '@/components/Screen';
import { useGame } from '@/game/GameContext';
import type { GameSettings } from '@/game/types';
import { colors, radius, spacing } from '@/theme';

function Pill({
  label,
  selected,
  onPress,
  disabled,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.pill, selected && styles.pillSelected, disabled && styles.pillDisabled]}>
      <AppText style={[styles.pillLabel, selected && styles.pillLabelSelected]}>{label}</AppText>
    </Pressable>
  );
}

export default function LobbyScreen() {
  const { game, updateSettings, startRound, leaveGame } = useGame();
  const you = game?.players.find((player) => player.isYou);

  if (!game) return <Redirect href="/" />;
  if (game.phase === 'play') return <Redirect href="/play" />;
  if (game.phase === 'results') return <Redirect href="/results" />;

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="label">Room {game.code}</AppText>
        <AppText variant="title">The table is set</AppText>
        <AppText variant="caption">
          {you?.isHost
            ? 'You are hosting. Tune the round, then drop the letter.'
            : `${game.players.find((player) => player.isHost)?.name ?? 'Host'} is hosting. In this prototype, anyone can start.`}
        </AppText>
      </View>

      <View style={styles.grid}>
        {game.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </View>

      <View style={styles.panel}>
        <AppText variant="label">Categories</AppText>
        <View style={styles.pills}>
          {([6, 8, 12] as GameSettings['categoryCount'][]).map((count) => (
            <Pill
              key={count}
              label={`${count}`}
              selected={game.settings.categoryCount === count}
              onPress={() => updateSettings({ categoryCount: count })}
            />
          ))}
        </View>
        <AppText variant="caption">{game.categories.map((category) => category.label).join(' · ')}</AppText>
      </View>

      <View style={styles.panel}>
        <AppText variant="label">Timer</AppText>
        <View style={styles.pills}>
          {([60, 90, 0] as GameSettings['roundSeconds'][]).map((seconds) => (
            <Pill
              key={seconds}
              label={seconds === 0 ? 'Off' : `${seconds}s`}
              selected={game.settings.roundSeconds === seconds}
              onPress={() => updateSettings({ roundSeconds: seconds })}
            />
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Button label={`Start round ${game.roundNumber}`} onPress={startRound} />
        <Button label="Leave table" variant="ghost" onPress={leaveGame} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  panel: {
    gap: spacing.sm,
    backgroundColor: colors.inkElevated,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  pillSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  pillDisabled: {
    opacity: 0.7,
  },
  pillLabel: {
    color: colors.cream,
    fontSize: 14,
  },
  pillLabelSelected: {
    color: colors.ink,
  },
  actions: {
    gap: spacing.sm,
  },
});
