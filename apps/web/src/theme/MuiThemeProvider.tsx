'use client';

import type { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { muiTheme } from './muiTheme';

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
