/**
 * CryptoMaster Unified Theme System
 * 
 * Tüm ekranlarda tutarlı renk paleti ve stil tanımları.
 * Auth ekranları dahil tek bir tema kullanılıyor.
 */

export const Colors = {
  // Primary Colors - Ana uygulama rengi (Cyan)
  primary: '#25AFF4',
  primaryDark: '#1E8BC3',
  primaryLight: '#5CC5F7',
  
  // Accent Colors - Vurgu için (Mor tonları)
  accent: '#6366F1',
  accentDark: '#4F46E5',
  accentLight: '#818CF8',
  
  // Background Colors
  backgroundDark: '#0F1923',
  backgroundLight: '#F5F7F8',
  
  // Surface Colors (Kartlar, Paneller)
  surfaceDark: '#1A262D',
  surfaceLight: '#FFFFFF',
  
  // Card Colors
  cardDark: '#1E2A32',
  cardLight: '#FFFFFF',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDark: '#1F2937',
  
  // Status Colors
  success: '#00D68F',
  successLight: '#00D68F20',
  danger: '#FF4B4B',
  dangerLight: '#FF4B4B20',
  warning: '#FFB800',
  warningLight: '#FFB80020',
  
  // Border Colors
  borderDark: '#2D3B45',
  borderLight: '#E5E7EB',
  
  // Gradient Colors
  gradientPrimary: ['#25AFF4', '#6366F1'],
  gradientAccent: ['#6366F1', '#A855F7'],
  gradientSuccess: ['#00D68F', '#10B981'],
  gradientDanger: ['#FF4B4B', '#EF4444'],
  
  // Crypto Coin Colors
  bitcoin: '#F7931A',
  ethereum: '#627EEA',
  solana: '#9945FF',
  
  // Transparency
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(255, 255, 255, 0.1)',
  
  // Glass Effect
  glassDark: 'rgba(15, 25, 35, 0.85)',
  glassLight: 'rgba(255, 255, 255, 0.85)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 32,
  display: 40,
};

export const FontWeights = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  }),
};

export const Theme = {
  dark: {
    background: Colors.backgroundDark,
    surface: Colors.surfaceDark,
    card: Colors.cardDark,
    text: Colors.textPrimary,
    textSecondary: Colors.textSecondary,
    border: Colors.borderDark,
    primary: Colors.primary,
  },
  light: {
    background: Colors.backgroundLight,
    surface: Colors.surfaceLight,
    card: Colors.cardLight,
    text: Colors.textDark,
    textSecondary: Colors.textMuted,
    border: Colors.borderLight,
    primary: Colors.primary,
  },
};

export default { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows, Theme };

