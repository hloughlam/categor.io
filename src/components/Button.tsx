import { useState } from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

type Variant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ label, onPress, variant = 'primary', disabled, style }: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        (pressed || hovered) && styles[`${variant}Active`],
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.label, variant === 'primary' ? styles.primaryLabel : styles.mutedLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  primary: {
    backgroundColor: colors.coral,
  },
  primaryActive: {
    backgroundColor: colors.coralDeep,
  },
  secondary: {
    backgroundColor: colors.inkElevated,
    borderWidth: 1,
    borderColor: colors.line,
  },
  secondaryActive: {
    backgroundColor: colors.inkSoft,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostActive: {
    backgroundColor: colors.inkSoft,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  primaryLabel: {
    color: colors.white,
  },
  mutedLabel: {
    color: colors.cream,
  },
});
