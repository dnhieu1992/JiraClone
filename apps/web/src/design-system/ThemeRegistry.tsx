'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { StyledEngineProvider, ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { theme } from './theme';

interface ColorSchemeContextType {
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

export const useColorSchemeContext = () => {
  const context = useContext(ColorSchemeContext);
  if (!context) {
    throw new Error('useColorSchemeContext must be used within ThemeRegistry');
  }
  return context;
};

// Internal component that uses useColorScheme (must be inside ThemeProvider)
function ColorSchemeManager({
  children,
  systemMode,
}: {
  children: React.ReactNode;
  systemMode: 'light' | 'dark' | 'system';
}) {
  const { setMode: setMuiMode } = useColorScheme();

  // Handle system preference changes
  useEffect(() => {
    if (systemMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setMuiMode(e.matches ? 'dark' : 'light');
      };

      // Set initial mode
      setMuiMode(mediaQuery.matches ? 'dark' : 'light');

      // Listen for changes
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setMuiMode(systemMode);
    }
  }, [systemMode, setMuiMode]);

  return <>{children}</>;
}

/**
 * ThemeRegistry - Wraps app with MUI theme and CSS variables
 * Provides color scheme switching functionality
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [systemMode, setSystemMode] = useState<'light' | 'dark' | 'system'>('system');
  const [initialMode, setInitialMode] = useState<'light' | 'dark'>('light');

  // Detect initial system preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setInitialMode(mediaQuery.matches ? 'dark' : 'light');
    }
  }, []);

  const handleSetMode = (newMode: 'light' | 'dark' | 'system') => {
    setSystemMode(newMode);
  };

  return (
    <ColorSchemeContext.Provider value={{ mode: systemMode, setMode: handleSetMode }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme} defaultMode={initialMode}>
          <ColorSchemeManager systemMode={systemMode}>
            <CssBaseline />
            {children}
          </ColorSchemeManager>
        </ThemeProvider>
      </StyledEngineProvider>
    </ColorSchemeContext.Provider>
  );
}

/**
 * ModeSwitcher - Simple toggle button for light/dark/system mode
 */
export function ModeSwitcher() {
  const { mode, setMode } = useColorSchemeContext();
  const { setMode: setMuiMode } = useColorScheme();
  const [currentMode, setCurrentMode] = useState<'light' | 'dark' | 'system'>(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const toggleMode = () => {
    const nextMode: 'light' | 'dark' | 'system' =
      currentMode === 'light' ? 'dark' : currentMode === 'dark' ? 'system' : 'light';
    setCurrentMode(nextMode);
    setMode(nextMode);
    
    // Update MUI mode immediately if not system
    if (nextMode !== 'system') {
      setMuiMode(nextMode);
    }
  };

  const getIcon = () => {
    if (currentMode === 'system') {
      // Show dark icon when system mode (will follow system preference)
      return <DarkModeIcon />;
    }
    return currentMode === 'light' ? <LightModeIcon /> : <DarkModeIcon />;
  };

  const getTooltip = () => {
    if (currentMode === 'system') {
      return 'System mode (click to switch to light)';
    }
    return currentMode === 'light' ? 'Light mode (click to switch to dark)' : 'Dark mode (click to switch to system)';
  };

  return (
    <Tooltip title={getTooltip()}>
      <IconButton onClick={toggleMode} size="small" sx={{ color: 'var(--ds-palette-text-primary)' }}>
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
}

