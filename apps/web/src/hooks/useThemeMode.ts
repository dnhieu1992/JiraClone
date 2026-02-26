'use client';

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  applyMode,
  getInitializeMode,
  getSystemMode,
  THEME_MODE_STORAGE_KEY,
  type ThemePreference,
  type ThemeMode,
} from '@/theme/themeMode';

const subscribeToSystemMode = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
};

type UseThemeModeResult = {
  preference: ThemePreference;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemePreference) => void;
  toggleMode: () => void;
};

export function useThemeMode(): UseThemeModeResult {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    getInitializeMode(),
  );
  const systemMode = useSyncExternalStore<ThemeMode>(
    subscribeToSystemMode,
    getSystemMode,
    () => 'light',
  );

  const mode: ThemeMode = preference === 'system' ? systemMode : preference;

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, preference);
    } catch {
      // Ignore localStorage access errors.
    }

  }, [preference]);

  useEffect(() => {
    applyMode(mode);
  }, [mode]);

  const setMode = useCallback((nextMode: ThemePreference) => {
    setPreference(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setPreference((prev) => {
      const resolvedMode = prev === 'system' ? systemMode : prev;
      return resolvedMode === 'dark' ? 'light' : 'dark';
    });
  }, [systemMode]);

  return {
    preference,
    mode,
    isDark: mode === 'dark',
    setMode,
    toggleMode,
  };
}
