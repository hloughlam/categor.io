import { Redirect, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { LetterTile } from '@/components/LetterTile';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useGame } from '@/game/GameContext';
import { colors, spacing } from '@/theme';

export default function HomeScreen() {
  const { playerName, setPlayerName, createGame, game } = useGame();
  const ready = playerName.trim().length >= 2;

  if (game) {
    const href = game.phase === 'play' ? '/play' : game.phase === 'results' ? '/results' : '/lobby';
    return <Redirect href={href} />;
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <LetterTile letter="C" size={88} />
        <View style={styles.brand}>
          <AppText variant="label" style={styles.eyebrow}>
            Party word game
          </AppText>
          <AppText variant="display">
            categor
            <AppText variant="display" style={styles.dot}>
              .
            </AppText>
            io
          </AppText>
        </View>
      </View>

      <AppText variant="subtitle">
        A letter drops. Everyone writes. Unique answers score more.
      </AppText>

      <TextField
        label="Your name"
        placeholder="Maya, Jules, you..."
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={16}
        value={playerName}
        onChangeText={setPlayerName}
        hint="This stays on this device for now — no accounts yet."
      />

      <View style={styles.actions}>
        <Button
          label="Create game"
          disabled={!ready}
          onPress={() => {
            createGame();
          }}
        />
        <Button
          label="Join game"
          variant="secondary"
          disabled={!ready}
          onPress={() => router.push('/join')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xl,
  },
  brand: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    color: colors.gold,
  },
  dot: {
    color: colors.coral,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
