import '@/global.css';

import { Platform } from 'react-native';

/** Paleta preuzeta sa znamjato.com (brand plava + neutralne ink boje). */
export const Colors = {
  light: {
    text: '#16202E',
    textBody: '#273244',
    textSecondary: '#4E5A70',
    textMuted: '#6C788D',
    background: '#F6F8FB',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#EAF2FF',
    border: '#E1E7F0',
    primary: '#1F4A86',
    primarySoft: '#EAF2FF',
    onPrimary: '#FFFFFF',
    header: '#0F2A49',
    success: '#1E8E5A',
    successSoft: '#E3F5EC',
    warning: '#B7791F',
    warningSoft: '#FDF1D8',
    danger: '#C23B3B',
    dangerSoft: '#FBE6E6',
  },
  dark: {
    text: '#ECF0F5',
    textBody: '#CBD3DE',
    textSecondary: '#97A2B2',
    textMuted: '#8791A2',
    background: '#12161D',
    backgroundElement: '#1E242D',
    backgroundSelected: '#1B2C4A',
    border: '#2C3542',
    primary: '#7AA3DC',
    primarySoft: '#1B2C4A',
    onPrimary: '#0B1424',
    header: '#10233F',
    success: '#4CC38A',
    successSoft: '#17342A',
    warning: '#E5B04A',
    warningSoft: '#3A2F17',
    danger: '#EE7B7B',
    dangerSoft: '#3D2020',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
