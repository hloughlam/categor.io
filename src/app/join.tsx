import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useGame } from '@/game/GameContext';
import { spacing } from '@/theme';

export default function JoinScreen() {
  const { playerName, setPlayerName, joinGame, game } = useGame();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (game) return <Redirect href="/lobby" />;

  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="label">Join a table</AppText>
        <AppText variant="title">Enter the room code</AppText>
        <AppText variant="caption">Any four-letter code works in this prototype.</AppText>
      </View>

      <TextField
        label="Your name"
        placeholder="Maya, Jules, you..."
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={16}
        value={playerName}
        onChangeText={setPlayerName}
      />

      <TextField
        label="Room code"
        placeholder="KITE"
        autoCapitalize="characters"
        autoCorrect={false}
        maxLength={4}
        value={code}
        onChangeText={(value) => {
          setCode(value.toUpperCase().replace(/[^A-Z]/g, ''));
          setError('');
        }}
      />

      {error ? <AppText style={styles.error}>{error}</AppText> : null}

      <View style={styles.actions}>
        <Button
          label="Sit down"
          disabled={code.length !== 4 || playerName.trim().length < 2}
          onPress={() => {
            if (!joinGame(code)) {
              setError('Need a name and a four-letter code.');
            }
          }}
        />
        <Button label="Back" variant="ghost" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingTop: spacing.xl,
  },
  actions: {
    gap: spacing.sm,
  },
  error: {
    color: '#FF8A7A',
  },
});
