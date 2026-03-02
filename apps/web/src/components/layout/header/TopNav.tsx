'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
  UserAvatar,
} from '@/components/ui';
import Bell from 'lucide-react/dist/esm/icons/bell';
import CircleHelp from 'lucide-react/dist/esm/icons/circle-help';
import CircleUserRound from 'lucide-react/dist/esm/icons/circle-user-round';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import MoonStar from 'lucide-react/dist/esm/icons/moon-star';
import Settings from 'lucide-react/dist/esm/icons/settings';
import Users from 'lucide-react/dist/esm/icons/users';
import { startKeycloakLogout } from '@/features/auth/api';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemePreference } from '@/theme/themeMode';

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Match browser' },
];

const topActions = [
  { label: 'Notifications', icon: <Bell size={18} strokeWidth={2} /> },
  { label: 'Help', icon: <CircleHelp size={18} strokeWidth={2} /> },
  { label: 'Settings', icon: <Settings size={18} strokeWidth={2} /> },
] as const;

const topActionTooltipSx = {
  bgcolor: '#F1F2F4',
  color: '#1F2328',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 500,
  px: 1.25,
  py: 0.5,
};

const currentUserName = 'Hiếu Đào';

function getThemePreviewClassName(value: ThemePreference) {
  if (value === 'dark') {
    return 'topnav__theme-preview topnav__theme-preview--dark';
  }

  if (value === 'light') {
    return 'topnav__theme-preview topnav__theme-preview--light';
  }

  return 'topnav__theme-preview topnav__theme-preview--system';
}

export default function TopNav() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuAnchorPosition, setMenuAnchorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const themeMenuOpen = Boolean(themeAnchor);
  const { mode, preference, setMode } = useThemeMode();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    const anchorRect = event.currentTarget.getBoundingClientRect();
    const headerElement = event.currentTarget.closest(
      '.header',
    ) as HTMLElement | null;
    const headerRect = headerElement?.getBoundingClientRect();

    setMenuAnchorPosition({
      top: Math.round(headerRect?.bottom ?? anchorRect.bottom),
      left: Math.round(anchorRect.right),
    });
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuAnchorPosition(null);
    setThemeAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    startKeycloakLogout();
  };

  const handleThemeOpen = (event: MouseEvent<HTMLElement>) => {
    setThemeAnchor((prev) => (prev ? null : event.currentTarget));
  };

  const handleThemeClose = () => {
    setThemeAnchor(null);
  };

  const handleThemeChange = (nextMode: Parameters<typeof setMode>[0]) => {
    setMode(nextMode);
    handleThemeClose();
  };

  return (
    <Box className="topnav">
      {topActions.map((action) => (
        <Tooltip
          key={action.label}
          title={action.label}
          placement="bottom"
          slotProps={{
            tooltip: {
              sx: topActionTooltipSx,
            },
          }}
        >
          <IconButton size="small">{action.icon}</IconButton>
        </Tooltip>
      ))}

      <IconButton
        size="small"
        onClick={handleMenuOpen}
        className="topnav__avatar-btn"
        aria-label="User menu"
        aria-controls={menuOpen ? 'header-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
      >
        <UserAvatar
          name={currentUserName}
          size="small"
          className="topnav__avatar"
        />
      </IconButton>

      <Menu
        id="header-user-menu"
        anchorEl={menuAnchor}
        anchorReference="anchorPosition"
        anchorPosition={menuAnchorPosition ?? undefined}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          className: 'topnav__user-menu-paper',
        }}
      >
        <Box className="topnav__user-card">
          <UserAvatar
            name={currentUserName}
            size="large"
            className="topnav__user-card-avatar"
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography className="topnav__user-name">
              {currentUserName}
            </Typography>
            <Typography className="topnav__user-email">
              dnhieu92@gmail.com
            </Typography>
          </Box>
        </Box>

        <MenuItem className="topnav__menu-item">
          <CircleUserRound
            className="topnav__menu-item-icon"
            size={16}
            strokeWidth={2}
          />
          Profile
        </MenuItem>
        <MenuItem className="topnav__menu-item">
          <Settings
            className="topnav__menu-item-icon"
            size={16}
            strokeWidth={2}
          />
          Account settings
        </MenuItem>
        <MenuItem
          onClick={handleThemeOpen}
          selected={themeMenuOpen}
          aria-haspopup="true"
          aria-controls={themeMenuOpen ? 'header-theme-menu' : undefined}
          aria-expanded={themeMenuOpen ? 'true' : undefined}
          className="topnav__menu-item topnav__menu-item--theme"
        >
          <MoonStar
            className="topnav__menu-item-icon"
            size={16}
            strokeWidth={2}
          />
          Theme
          <Box
            className={`topnav__menu-arrow ${themeMenuOpen ? 'topnav__menu-arrow--open' : ''}`}
          >
            ›
          </Box>
        </MenuItem>
        <Popover
          id="header-theme-menu"
          open={themeMenuOpen}
          anchorEl={themeAnchor}
          onClose={handleThemeClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          disablePortal
          disableAutoFocus
          disableEnforceFocus
          PaperProps={{
            className: 'topnav__theme-popover-paper',
            style: { marginTop: 6 },
          }}
        >
          <Box className="topnav__theme-list">
            {themeOptions.map((option) => {
              const selected = preference === option.value;

              return (
                <MenuItem
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  selected={selected}
                  className="topnav__theme-item"
                >
                  <Box
                    className={`topnav__theme-radio ${
                      selected ? 'topnav__theme-radio--selected' : ''
                    }`}
                  >
                    {selected ? (
                      <Box className="topnav__theme-radio-dot" />
                    ) : null}
                  </Box>
                  <Box
                    aria-hidden
                    className={getThemePreviewClassName(option.value)}
                  />
                  <Box>
                    <Typography
                      className={`topnav__theme-label ${selected ? 'topnav__theme-label--selected' : ''}`}
                    >
                      {option.label}
                    </Typography>
                    {option.value === 'system' ? (
                      <Typography
                        variant="body2"
                        className="topnav__theme-current"
                      >
                        Current: {mode}
                      </Typography>
                    ) : null}
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
        </Popover>
        <Divider className="topnav__divider" />
        <MenuItem className="topnav__menu-item">
          <Users className="topnav__menu-item-icon" size={16} strokeWidth={2} />
          Switch account
        </MenuItem>
        <MenuItem onClick={handleLogout} className="topnav__menu-item">
          <LogOut
            className="topnav__menu-item-icon"
            size={16}
            strokeWidth={2}
          />
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
}
