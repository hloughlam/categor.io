import { StyleSheet, View } from 'react-native';

import type { Player } from '@/game/types';
import { colors, radius, spacing } from '@/theme';

import { AppText } from './AppText';
import { Avatar } from './Avatar';

export function PlayerCard({ player }: { player: Player }) {
  return (
    <View style={styles.card}>
      <Avatar player={player} size={48} />
      <View style={styles.meta}>
        <AppText variant="body" style={styles.name} numberOfLines={1}>
          {player.name}
          {player.isYou ? ' · you' : ''}
        </AppText>
        <AppText variant="caption">{player.isHost ? 'Host' : 'Player'}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.inkElevated,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.sm,
    flexBasis: '47%',
    flexGrow: 0,
    minWidth: 0,
  },
  meta: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 15,
  },
});
