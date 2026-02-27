import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(var(--color-primary))',
      dark: 'rgb(var(--color-primary-hover))',
      contrastText: 'rgb(var(--color-text-inverse))',
    },
    success: {
      main: 'rgb(var(--color-success))',
    },
    warning: {
      main: 'rgb(var(--color-warning))',
    },
    error: {
      main: 'rgb(var(--color-danger))',
    },
    background: {
      default: 'rgb(var(--color-bg))',
      paper: 'rgb(var(--color-surface))',
    },
    text: {
      primary: 'rgb(var(--color-text))',
      secondary: 'rgb(var(--color-text-muted))',
    },
    divider: 'rgb(var(--color-border))',
    action: {
      hover: 'rgb(var(--color-surface-hover))',
      selected: 'rgb(var(--color-surface-subtle))',
      focus: 'rgb(var(--color-surface-hover))',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'rgb(var(--color-bg))',
          color: 'rgb(var(--color-text))',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgb(var(--color-border))',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(var(--color-border))',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(var(--color-border-strong))',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(var(--color-primary))',
            borderWidth: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'rgb(var(--color-primary))',
          '&:hover': {
            backgroundColor: 'rgb(var(--color-primary-hover))',
          },
          '&:active': {
            backgroundColor: 'rgb(var(--color-primary-pressed))',
          },
        },
        outlined: {
          borderColor: 'rgb(var(--color-border))',
          '&:hover': {
            borderColor: 'rgb(var(--color-primary))',
            backgroundColor: 'rgb(var(--color-surface-hover))',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'var(--ds-text-subtle)',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgb(var(--color-surface-hover))',
          },
        },
      },
    },
  },
});
