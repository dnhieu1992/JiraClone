/**
 * Design System Tokens - Jira-like (Atlassian-inspired)
 * Semantic tokens for light and dark color schemes
 */

export type ColorScheme = 'light' | 'dark';

export interface DesignTokens {
  color: {
    bg: string; // Main background (light gray)
    surface: string; // Card/paper background (white)
    surface2: string; // Secondary surface (slightly darker)
    border: string; // Subtle borders
    text: string; // Primary text
    textMuted: string; // Secondary/muted text
    primary: string; // Primary blue (Jira blue)
    primaryHover: string; // Primary hover state
    danger: string; // Error/danger red
    warning: string; // Warning orange
    success: string; // Success green
    focusRing: string; // Focus ring color
  };
  spacing: {
    xs: string; // 4px
    sm: string; // 8px
    md: string; // 12px
    lg: string; // 16px
    xl: string; // 24px
    '2xl': string; // 32px
    '3xl': string; // 48px
  };
  radius: {
    sm: string; // 4px
    md: string; // 6px
    lg: string; // 8px
    xl: string; // 10px
  };
  shadow: {
    sm: string; // Subtle shadow
    md: string; // Medium shadow
    lg: string; // Larger shadow
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string; // 12px
      sm: string; // 14px
      base: string; // 16px
    };
    fontWeight: {
      normal: number; // 400
      medium: number; // 500
      semibold: number; // 600
    };
    lineHeight: {
      tight: number; // 1.2
      normal: number; // 1.5
      relaxed: number; // 1.75
    };
  };
}

const baseSpacing = 4; // 4px base unit

export const tokens: Record<ColorScheme, DesignTokens> = {
  light: {
    color: {
      bg: '#f4f5f7', // Light gray background (Jira-like)
      surface: '#ffffff', // White cards
      surface2: '#fafbfc', // Slightly off-white
      border: '#dfe1e6', // Subtle gray border
      text: '#172b4d', // Dark blue-gray text
      textMuted: '#6b778c', // Muted gray text
      primary: '#0052cc', // Jira blue
      primaryHover: '#0065ff', // Lighter blue on hover
      danger: '#de350b', // Red
      warning: '#ffab00', // Orange
      success: '#00875a', // Green
      focusRing: '#0052cc', // Primary blue for focus
    },
    spacing: {
      xs: `${baseSpacing}px`, // 4px
      sm: `${baseSpacing * 2}px`, // 8px
      md: `${baseSpacing * 3}px`, // 12px
      lg: `${baseSpacing * 4}px`, // 16px
      xl: `${baseSpacing * 6}px`, // 24px
      '2xl': `${baseSpacing * 8}px`, // 32px
      '3xl': `${baseSpacing * 12}px`, // 48px
    },
    radius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
    },
    shadow: {
      sm: '0 1px 2px rgba(9, 30, 66, 0.08)',
      md: '0 2px 4px rgba(9, 30, 66, 0.08)',
      lg: '0 4px 8px rgba(9, 30, 66, 0.12)',
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
  },
  dark: {
    color: {
      bg: '#1d2125', // Dark background
      surface: '#22272b', // Dark card background
      surface2: '#282e33', // Slightly lighter dark surface
      border: '#38414a', // Dark border
      text: '#b3bac5', // Light text
      textMuted: '#8c9cb8', // Muted light text
      primary: '#4c9aff', // Lighter blue for dark mode
      primaryHover: '#2684ff', // Hover state
      danger: '#ff5630', // Bright red
      warning: '#ffab00', // Orange
      success: '#36b37e', // Green
      focusRing: '#4c9aff', // Primary blue for focus
    },
    spacing: {
      xs: `${baseSpacing}px`, // 4px
      sm: `${baseSpacing * 2}px`, // 8px
      md: `${baseSpacing * 3}px`, // 12px
      lg: `${baseSpacing * 4}px`, // 16px
      xl: `${baseSpacing * 6}px`, // 24px
      '2xl': `${baseSpacing * 8}px`, // 32px
      '3xl': `${baseSpacing * 12}px`, // 48px
    },
    radius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
    },
    shadow: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.2)',
      md: '0 2px 4px rgba(0, 0, 0, 0.25)',
      lg: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    typography: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
    },
  },
};

