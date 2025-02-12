import { FONTS } from './fonts';

export const TYPOGRAPHY = {
  display: {
    fontSize: 44,
    lineHeight: 48,
    fontFamily: FONTS.inter.bold,
    letterSpacing: -1,
  },
  h1: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: FONTS.inter.bold,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: FONTS.inter.semiBold,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: FONTS.inter.semiBold,
    letterSpacing: -0.2,
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FONTS.inter.regular,
    letterSpacing: -0.1,
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONTS.inter.regular,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.inter.regular,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: FONTS.inter.medium,
    letterSpacing: -0.1,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.inter.medium,
  },
  price: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FONTS.inter.semiBold,
    letterSpacing: -0.2,
  },
  badge: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.inter.medium,
    letterSpacing: 0.2,
  },
} as const;
