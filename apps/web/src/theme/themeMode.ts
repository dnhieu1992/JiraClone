export type ThemeMode = 'light' | 'dark';
export type ThemePreference = ThemeMode | 'system';

export const THEME_MODE_STORAGE_KEY = 'theme-mode';

const isThemePreference = (value: string | null): value is ThemePreference =>
  value === 'light' || value === 'dark' || value === 'system';

export function getSystemMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getInitializeMode(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system';
  }

  try {
    const storedMode = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
    if (isThemePreference(storedMode)) {
      return storedMode;
    }
  } catch {
    // Ignore localStorage access errors and continue with system preference.
  }

  return 'system';
}

export function applyMode(mode: ThemeMode) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
  root.style.colorScheme = mode;
}
