import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, fonts, radius, spacing } from '@/theme';

import { AppText } from './AppText';

type TextFieldProps = TextInputProps & {
  label?: string;
  hint?: string;
};

export function TextField({ label, hint, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.wrap}>
      {label ? <AppText variant="label">{label}</AppText> : null}
      <TextInput
        placeholderTextColor={colors.muted}
        {...props}
        style={[styles.input, style]}
      />
      {hint ? <AppText variant="caption">{hint}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  input: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.inkElevated,
    borderWidth: 1,
    borderColor: colors.line,
    color: colors.cream,
    fontFamily: fonts.medium,
    fontSize: 16,
    paddingHorizontal: spacing.md,
  },
});
