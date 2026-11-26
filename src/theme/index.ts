export const colors = {
  ink: '#100D14',
  inkElevated: '#1A1524',
  inkSoft: '#241C33',
  line: '#3A3150',
  cream: '#F4EBDD',
  creamMuted: '#C9BBA8',
  muted: '#9C90A8',
  gold: '#E8B84A',
  goldDeep: '#C4922A',
  coral: '#FF5A3C',
  coralDeep: '#E03E28',
  mint: '#4ADE80',
  lilac: '#C4B5FD',
  sky: '#7DD3FC',
  rose: '#FB7185',
  white: '#FFFFFF',
} as const;

export const avatarPalette = [
  colors.coral,
  colors.gold,
  colors.mint,
  colors.lilac,
  colors.sky,
  colors.rose,
] as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 28,
  pill: 999,
} as const;

export const fonts = {
  display: 'Fraunces_700Bold',
  displayItalic: 'Fraunces_400Regular_Italic',
  title: 'Fraunces_600SemiBold',
  body: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
} as const;

export const layout = {
  maxWidth: 560,
  wideBreakpoint: 900,
} as const;
