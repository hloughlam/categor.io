import { StyleSheet, View } from 'react-native';

import { colors, fonts } from '@/theme';
import type { Player } from '@/game/types';

import { AppText } from './AppText';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

type AvatarProps = {
  player: Player;
  size?: number;
};

export function Avatar({ player, size = 56 }: AvatarProps) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: player.color }]}>
      <AppText style={[styles.initials, { fontSize: size * 0.34 }]}>{initials(player.name)}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fonts.bold,
    color: colors.ink,
  },
});
