import { Text, type TextProps, type TextStyle } from 'react-native';

import { colors, fonts } from '@/theme';

type Variant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'caption' | 'stat';

const styles: Record<Variant, TextStyle> = {
  display: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: -0.8,
    color: colors.cream,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 28,
    lineHeight: 34,
    color: colors.cream,
  },
  subtitle: {
    fontFamily: fonts.displayItalic,
    fontSize: 18,
    lineHeight: 26,
    color: colors.creamMuted,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.cream,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
  stat: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 24,
    color: colors.cream,
  },
};

type AppTextProps = TextProps & {
  variant?: Variant;
};

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles[variant], style]} />;
}
