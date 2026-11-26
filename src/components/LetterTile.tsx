import { StyleSheet, View } from 'react-native';

import { colors, fonts, radius } from '@/theme';

import { AppText } from './AppText';

type LetterTileProps = {
  letter: string;
  size?: number;
};

export function LetterTile({ letter, size = 132 }: LetterTileProps) {
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: Math.max(radius.lg, size * 0.22),
        },
      ]}>
      <AppText style={[styles.letter, { fontSize: size * 0.58, lineHeight: size * 0.68 }]}>{letter}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.gold,
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  letter: {
    fontFamily: fonts.display,
    color: colors.ink,
  },
});
