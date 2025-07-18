import { useColorScheme } from 'react-native';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    primary: '#6366F1',
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',
    secondary: '#8B5CF6',
    secondaryLight: '#A78BFA',
    secondaryDark: '#7C3AED',
    accent: '#06B6D4',
    accentLight: '#22D3EE',
    accentDark: '#0891B2',
    success: '#10B981',
    successLight: '#34D399',
    successDark: '#059669',
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    warningDark: '#D97706',
    error: '#EF4444',
    errorLight: '#F87171',
    errorDark: '#DC2626',
    background: isDark ? '#0F0F23' : '#FFFFFF',
    backgroundSecondary: isDark ? '#1A1A2E' : '#F8F9FA',
    surface: isDark ? '#1E1E3A' : '#F8F9FA',
    surfaceSecondary: isDark ? '#2D2D5A' : '#F1F5F9',
    card: isDark ? '#2D2D5A' : '#FFFFFF',
    cardSecondary: isDark ? '#3A3A6B' : '#F8F9FA',
    text: isDark ? '#FFFFFF' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#6B7280',
    textTertiary: isDark ? '#9CA3AF' : '#9CA3AF',
    border: isDark ? '#374151' : '#E5E7EB',
    borderLight: isDark ? '#4B5563' : '#F3F4F6',
    shadow: isDark ? '#000000' : '#000000',
    overlay: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
  };

  const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  };

  const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 999,
  };

  const shadows = {
    sm: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  };

  return {
    colors,
    spacing,
    borderRadius,
    shadows,
    isDark,
  };
}