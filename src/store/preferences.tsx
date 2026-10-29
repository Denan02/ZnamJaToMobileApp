import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from 'expo-router';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

import type { Location } from '@/data/locations';

export type ThemePreference = 'system' | 'light' | 'dark';

type Preferences = { theme: ThemePreference; location: Location | null };

type PreferencesContextValue = Preferences & {
  setTheme: (theme: ThemePreference) => void;
  setLocation: (location: Location | null) => void;
};

// Splash ostaje vidljiv dok se postavke ne učitaju; ne smijemo vraćati null iz root layouta.
SplashScreen.preventAutoHideAsync();

const STORAGE_KEY = 'znamjato:preferences:v1';
const defaults: Preferences = { theme: 'system', location: null };

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const applyTheme = (theme: ThemePreference) =>
  Appearance.setColorScheme(theme === 'system' ? 'unspecified' : theme);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefs] = useState<Preferences>(defaults);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved: Preferences = { ...defaults, ...JSON.parse(raw) };
        applyTheme(saved.theme);
        setPrefs(saved);
      })
      .catch(() => {})
      .finally(() => SplashScreen.hide());
  }, []);

  const update = useCallback((patch: Partial<Preferences>) => {
    setPrefs((current) => {
      const next = { ...current, ...patch };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      ...prefs,
      setTheme: (theme) => {
        applyTheme(theme);
        update({ theme });
      },
      setLocation: (location) => update({ location }),
    }),
    [prefs, update],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences mora biti unutar PreferencesProvider');
  return ctx;
}
