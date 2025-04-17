/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#e51827';
const tintColorDark = '#e51827';

export default {
  light: {
    primary: '#e51827',
    primaryLight: '#f73b48',
    primaryDark: '#c41420',
    secondary: '#475569',
    secondaryLight: '#64748B',
    secondaryDark: '#334155',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    text: '#0F172A',
    background: '#F8FAFC',
    tint: tintColorLight,
    tabIconDefault: '#94A3B8',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#e51827',
    primaryLight: '#f73b48',
    primaryDark: '#c41420',
    secondary: '#64748B',
    secondaryLight: '#94A3B8',
    secondaryDark: '#475569',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    text: '#F8FAFC',
    background: '#0F172A',
    tint: tintColorDark,
    tabIconDefault: '#CBD5E1',
    tabIconSelected: tintColorDark,
  },
};
