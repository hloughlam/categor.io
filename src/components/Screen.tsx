import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
};

export function Screen({ children, scroll = true, contentStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const paddedStyle = [
    styles.content,
    {
      paddingTop: Math.max(insets.top, 20) + spacing.md,
      paddingBottom: Math.max(insets.bottom, 16) + spacing.lg,
    },
    contentStyle,
  ];

  const background = (
    <View pointerEvents="none" style={styles.backdrop}>
      <View style={styles.glowGold} />
      <View style={styles.glowCoral} />
    </View>
  );

  if (!scroll) {
    return (
      <View style={styles.root}>
        {background}
        <View style={[paddedStyle, styles.fill]}>{children}</View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {background}
      <ScrollView
        contentContainerStyle={paddedStyle}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  fill: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  glowGold: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(232, 184, 74, 0.16)',
    top: -80,
    right: -60,
  },
  glowCoral: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 90, 60, 0.12)',
    bottom: 40,
    left: -80,
  },
});
