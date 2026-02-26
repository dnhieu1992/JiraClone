'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from '@/components/ui';
import {
  Brightness4OutlinedIcon,
  GroupAddOutlinedIcon,
  HelpOutlineIcon,
  LogoutOutlinedIcon,
  ManageAccountsOutlinedIcon,
  NotificationsNoneIcon,
  PersonOutlineOutlinedIcon,
  SettingsOutlinedIcon,
} from '@/components/ui/icons';
import { startKeycloakLogout } from '@/features/auth/api';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemePreference } from '@/theme/themeMode';

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Match browser' },
];

const themePreviewBaseClassName =
  'relative h-[52px] w-[88px] overflow-hidden rounded border border-border before:absolute before:left-1.5 before:right-1.5 before:top-1 before:h-1.5 before:rounded-full before:content-[""] after:absolute after:bottom-1.5 after:left-1.5 after:top-3.5 after:w-[18px] after:rounded-sm after:content-[""]';

function getThemePreviewClassName(value: ThemePreference) {
  if (value === 'dark') {
    return `${themePreviewBaseClassName} bg-[rgb(29_33_37)] before:bg-[rgb(56_65_74)] after:bg-[rgb(34_39_43)]`;
  }

  if (value === 'light') {
    return `${themePreviewBaseClassName} bg-[rgb(255_255_255)] before:bg-border after:bg-bg`;
  }

  return `${themePreviewBaseClassName} bg-[linear-gradient(90deg,rgb(29_33_37)_0%,rgb(29_33_37)_50%,rgb(255_255_255)_50%,rgb(255_255_255)_100%)] before:bg-border after:bg-bg`;
}

export default function TopNav() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [themeAnchor, setThemeAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const themeMenuOpen = Boolean(themeAnchor);
  const { mode, preference, setMode } = useThemeMode();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
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
    <Box className="flex items-center gap-1.5">
      <IconButton size="small" className="!text-[var(--ds-text-subtle)]">
        <NotificationsNoneIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" className="!text-[var(--ds-text-subtle)]">
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" className="!text-[var(--ds-text-subtle)]">
        <SettingsOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={handleMenuOpen}
        className="p-0"
        aria-label="User menu"
        aria-controls={menuOpen ? 'topbar-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
      >
        <Avatar className="h-8 w-8 bg-avatar-green text-[14px] font-semibold">H</Avatar>
      </IconButton>

      <Menu
        id="topbar-user-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          className:
            'mt-1 min-w-[320px] rounded-xl border border-[#3b3e45] bg-[#2b2d33] p-1.5 text-[#c6c8ce] shadow-[0_18px_34px_rgba(0,0,0,0.45)]',
        }}
      >
        <Box className="mb-1.5 flex items-center gap-4 rounded-lg bg-[#171a1f] px-4 py-3">
          <Avatar className="h-[96px] w-[96px] bg-[#0b8f62] text-[56px] font-semibold">H</Avatar>
          <Box>
            <Typography fontWeight={700} className="!text-[20px] !leading-tight !text-[#f1f2f4]">
              Hiếu Đào
            </Typography>
            <Typography className="mt-1 !text-[14px] !text-[#9ea2ab]">
              dnhieu92@gmail.com
            </Typography>
          </Box>
        </Box>

        <MenuItem className="min-h-[64px] gap-3 rounded-md px-4 !text-[18px] !text-[#d0d2d8]">
          <PersonOutlineOutlinedIcon className="!text-[24px] !text-[#d0d2d8]" />
          Profile
        </MenuItem>
        <MenuItem className="min-h-[64px] gap-3 rounded-md px-4 !text-[18px] !text-[#d0d2d8]">
          <ManageAccountsOutlinedIcon className="!text-[24px] !text-[#d0d2d8]" />
          Account settings
        </MenuItem>
        <MenuItem
          onClick={handleThemeOpen}
          selected={themeMenuOpen}
          aria-haspopup="true"
          aria-controls={themeMenuOpen ? 'topbar-theme-menu' : undefined}
          aria-expanded={themeMenuOpen ? 'true' : undefined}
          className="min-h-[64px] gap-3 rounded-md px-4 !text-[18px] !text-[#d0d2d8] [&.Mui-selected]:bg-[#123263] [&.Mui-selected]:!text-[#8fb8f6] [&.Mui-selected:hover]:bg-[#144794]"
        >
          <Brightness4OutlinedIcon className="!text-[24px]" />
          Theme
          <Box className={`ml-auto text-[28px] leading-none ${themeMenuOpen ? 'text-[#8fb8f6]' : 'text-[#b8bbc3]'}`}>
            ›
          </Box>
        </MenuItem>
        <Popover
          id="topbar-theme-menu"
          open={themeMenuOpen}
          anchorEl={themeAnchor}
          onClose={handleThemeClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          disablePortal
          disableAutoFocus
          disableEnforceFocus
          PaperProps={{
            className:
              '-mt-0.5 mr-0.5 min-w-[300px] rounded-lg border border-border bg-surface p-0.5 shadow-[0_12px_24px_rgba(9,30,66,0.18)]',
          }}
        >
          <Box className="flex flex-col">
            {themeOptions.map((option) => {
              const selected = preference === option.value;

              return (
                <MenuItem
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  selected={selected}
                  className="grid grid-cols-[24px_88px_1fr] items-center gap-2 rounded-md px-1.5 py-2.5 [&.Mui-selected]:bg-primary/15 [&.Mui-selected:hover]:bg-primary/20"
                >
                  <Box
                    className={`grid h-[22px] w-[22px] place-items-center rounded-full border-2 ${
                      selected ? 'border-primary' : 'border-border-strong'
                    }`}
                  >
                    {selected ? (
                      <Box className="h-2.5 w-2.5 rounded-full bg-primary" />
                    ) : null}
                  </Box>
                  <Box aria-hidden className={getThemePreviewClassName(option.value)} />
                  <Box>
                    <Typography
                      className={`font-medium ${selected ? 'text-primary' : 'text-text'}`}
                    >
                      {option.label}
                    </Typography>
                    {option.value === 'system' ? (
                      <Typography variant="body2" className="text-text-muted">
                        Current: {mode}
                      </Typography>
                    ) : null}
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
        </Popover>
        <Divider className="my-1 border-[#3f424a]" />
        <MenuItem className="min-h-[64px] gap-3 rounded-md px-4 !text-[18px] !text-[#d0d2d8]">
          <GroupAddOutlinedIcon className="!text-[24px] !text-[#d0d2d8]" />
          Switch account
        </MenuItem>
        <MenuItem onClick={handleLogout} className="min-h-[64px] gap-3 rounded-md px-4 !text-[18px] !text-[#d0d2d8]">
          <LogoutOutlinedIcon className="!text-[24px] !text-[#d0d2d8]" />
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
}
