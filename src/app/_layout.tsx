import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';
import { PreferencesProvider } from '@/store/preferences';

function ThemedStack() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[scheme];
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider
      value={{
        ...base,
        colors: {
          ...base.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.backgroundElement,
          text: colors.text,
          border: colors.border,
        },
      }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="clanak/[slug]" options={{ title: 'Članak' }} />
        <Stack.Screen name="tema/[slug]" options={{ title: 'Tema' }} />
        <Stack.Screen name="alat/[slug]" options={{ title: 'Alat' }} />
        <Stack.Screen name="kategorija/[slug]" options={{ title: 'Oblast' }} />
        <Stack.Screen name="pretraga" options={{ title: 'Pretraga', presentation: 'modal' }} />
        <Stack.Screen name="lokacija" options={{ title: 'Lokacija', presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <ThemedStack />
    </PreferencesProvider>
  );
}
