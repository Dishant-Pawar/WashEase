export const COLORS = {
  primary: '#0061a4',
  primaryContainer: '#2196f3',
  background: '#f7f9fb',
  surface: '#ffffff',
  surfaceContainerLow: '#f2f4f6',
  surfaceContainerHigh: '#e6e8ea',
  text: '#191c1e',
  textVariant: '#404752',
  success: '#006e1c',
  error: '#ba1a1a',
  outline: '#707883',
  glass: 'rgba(255, 255, 255, 0.7)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const ROUNDNESS = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const TYPOGRAPHY = {
  h1: {
    fontFamily: 'Manrope-Bold',
    fontSize: 32,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 24,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
};
