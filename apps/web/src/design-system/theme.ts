import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

/**
 * MUI v7 Theme with CSS Variables enabled
 * Jira-like design system
 */
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class', // Toggle by .light/.dark class on <html>
    cssVarPrefix: 'ds', // CSS vars will be prefixed with --ds-
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        background: {
          default: tokens.light.color.bg,
          paper: tokens.light.color.surface,
        },
        text: {
          primary: tokens.light.color.text,
          secondary: tokens.light.color.textMuted,
        },
        divider: tokens.light.color.border,
        primary: {
          main: tokens.light.color.primary,
          dark: tokens.light.color.primaryHover,
        },
        error: {
          main: tokens.light.color.danger,
        },
        warning: {
          main: tokens.light.color.warning,
        },
        success: {
          main: tokens.light.color.success,
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: tokens.dark.color.bg,
          paper: tokens.dark.color.surface,
        },
        text: {
          primary: tokens.dark.color.text,
          secondary: tokens.dark.color.textMuted,
        },
        divider: tokens.dark.color.border,
        primary: {
          main: tokens.dark.color.primary,
          dark: tokens.dark.color.primaryHover,
        },
        error: {
          main: tokens.dark.color.danger,
        },
        warning: {
          main: tokens.dark.color.warning,
        },
        success: {
          main: tokens.dark.color.success,
        },
      },
    },
  },
  shape: {
    borderRadius: parseInt(tokens.light.radius.md, 10), // 6px default
  },
  typography: {
    fontFamily: tokens.light.typography.fontFamily,
    fontSize: parseInt(tokens.light.typography.fontSize.base, 10),
    fontWeightRegular: tokens.light.typography.fontWeight.normal,
    fontWeightMedium: tokens.light.typography.fontWeight.medium,
    fontWeightSemiBold: tokens.light.typography.fontWeight.semibold,
    h1: {
      fontSize: '24px',
      fontWeight: tokens.light.typography.fontWeight.semibold,
      lineHeight: tokens.light.typography.lineHeight.tight,
    },
    h2: {
      fontSize: '20px',
      fontWeight: tokens.light.typography.fontWeight.semibold,
      lineHeight: tokens.light.typography.lineHeight.tight,
    },
    h3: {
      fontSize: '18px',
      fontWeight: tokens.light.typography.fontWeight.semibold,
      lineHeight: tokens.light.typography.lineHeight.normal,
    },
    body1: {
      fontSize: tokens.light.typography.fontSize.base,
      lineHeight: tokens.light.typography.lineHeight.normal,
    },
    body2: {
      fontSize: tokens.light.typography.fontSize.sm,
      lineHeight: tokens.light.typography.lineHeight.normal,
    },
    button: {
      textTransform: 'none',
      fontWeight: tokens.light.typography.fontWeight.medium,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'var(--ds-palette-background-default)',
          color: 'var(--ds-palette-text-primary)',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.light.radius.md,
          height: '32px',
          padding: `${tokens.light.spacing.sm} ${tokens.light.spacing.lg}`,
          fontSize: tokens.light.typography.fontSize.sm,
          fontWeight: tokens.light.typography.fontWeight.medium,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: tokens.light.shadow.sm,
          },
        },
        contained: {
          '&:hover': {
            boxShadow: tokens.light.shadow.md,
          },
        },
        outlined: {
          borderColor: 'var(--ds-palette-divider)',
          '&:hover': {
            borderColor: 'var(--ds-palette-primary-main)',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: tokens.light.radius.md,
            fontSize: tokens.light.typography.fontSize.sm,
            '& fieldset': {
              borderColor: 'var(--ds-palette-divider)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--ds-palette-text-secondary)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--ds-palette-primary-main)',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: tokens.light.radius.md,
          fontSize: tokens.light.typography.fontSize.sm,
          '& fieldset': {
            borderColor: 'var(--ds-palette-divider)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--ds-palette-text-secondary)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--ds-palette-primary-main)',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: tokens.light.radius.md,
          border: `1px solid var(--ds-palette-divider)`,
          boxShadow: tokens.light.shadow.sm,
          backgroundColor: 'var(--ds-palette-background-paper)',
        },
        elevation1: {
          boxShadow: tokens.light.shadow.sm,
        },
        elevation2: {
          boxShadow: tokens.light.shadow.md,
        },
        elevation4: {
          boxShadow: tokens.light.shadow.lg,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.light.radius.md,
          border: `1px solid var(--ds-palette-divider)`,
          boxShadow: tokens.light.shadow.sm,
          '&:hover': {
            boxShadow: tokens.light.shadow.md,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableHead-root': {
            backgroundColor: 'var(--ds-palette-background-default)',
            '& .MuiTableCell-head': {
              fontWeight: tokens.light.typography.fontWeight.semibold,
              fontSize: tokens.light.typography.fontSize.sm,
              color: 'var(--ds-palette-text-secondary)',
            },
          },
          '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
              '&:hover': {
                backgroundColor: 'var(--ds-palette-background-default)',
              },
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'var(--ds-palette-divider)',
          fontSize: tokens.light.typography.fontSize.sm,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.light.radius.sm,
          fontSize: tokens.light.typography.fontSize.xs,
          height: '24px',
          backgroundColor: 'var(--ds-palette-background-default)',
          border: `1px solid var(--ds-palette-divider)`,
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'var(--ds-palette-primary-main)',
            color: '#ffffff',
            border: 'none',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: tokens.light.radius.md,
          fontSize: tokens.light.typography.fontSize.xs,
          boxShadow: tokens.light.shadow.md,
          backgroundColor: 'var(--ds-palette-text-primary)',
          color: 'var(--ds-palette-background-paper)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.light.radius.md,
          boxShadow: tokens.light.shadow.lg,
          border: `1px solid var(--ds-palette-divider)`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.light.radius.lg,
          boxShadow: tokens.light.shadow.lg,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: tokens.light.typography.fontSize.sm,
        },
      },
    },
  },
});

