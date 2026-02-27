import { createTheme } from '@mui/material/styles';

const spacingMap: Record<number, string> = {
  0: 'var(--space-0)',
  0.5: 'calc(var(--space-1) / 2)',
  1: 'var(--space-1)',
  1.5: 'calc(var(--space-1) + 2px)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
};

const spacing = (value: number) => spacingMap[value] ?? `${value * 4}px`;

export const muiTheme = createTheme({
  spacing,
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1300,
    modal: 1400,
    snackbar: 1500,
    tooltip: 1600,
  },
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
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: 'none',
      fontWeight: 'var(--font-weight-semibold)',
      lineHeight: 'var(--line-height-md)',
    },
    h1: {
      fontSize: 'var(--font-size-3xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-bold)',
    },
    h2: {
      fontSize: 'var(--font-size-2xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-bold)',
    },
    h3: {
      fontSize: 'var(--font-size-xl)',
      lineHeight: 'var(--line-height-sm)',
      fontWeight: 'var(--font-weight-semibold)',
    },
    h4: {
      fontSize: 'var(--font-size-xl)',
      lineHeight: 'var(--line-height-sm)',
      fontWeight: 'var(--font-weight-semibold)',
    },
    h5: {
      fontSize: 'var(--font-size-lg)',
      lineHeight: 'var(--line-height-sm)',
      fontWeight: 'var(--font-weight-semibold)',
    },
    h6: {
      fontSize: 'var(--font-size-md)',
      lineHeight: 'var(--line-height-md)',
      fontWeight: 'var(--font-weight-semibold)',
    },
    subtitle1: {
      fontSize: 'var(--font-size-md)',
      lineHeight: 'var(--line-height-md)',
      fontWeight: 'var(--font-weight-medium)',
    },
    subtitle2: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-md)',
      fontWeight: 'var(--font-weight-medium)',
    },
    body1: {
      fontSize: 'var(--font-size-md)',
      lineHeight: 'var(--line-height-md)',
      fontWeight: 'var(--font-weight-regular)',
    },
    body2: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-md)',
      fontWeight: 'var(--font-weight-regular)',
    },
    caption: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-sm)',
      fontWeight: 'var(--font-weight-regular)',
    },
    overline: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-sm)',
      fontWeight: 'var(--font-weight-medium)',
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
