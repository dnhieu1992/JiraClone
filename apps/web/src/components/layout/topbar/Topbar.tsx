'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from '@/components/ui';
import {
  AddIcon,
  AppsIcon,
  Brightness4OutlinedIcon,
  GroupAddOutlinedIcon,
  HelpOutlineIcon,
  LogoutOutlinedIcon,
  ManageAccountsOutlinedIcon,
  NotificationsNoneIcon,
  PersonOutlineOutlinedIcon,
  SearchIcon,
  SettingsOutlinedIcon,
} from '@/components/ui/icons';
import { PanelRightClose } from 'lucide-react';
import { startKeycloakLogout } from '@/features/auth/api';
import { useThemeMode } from '@/hooks/useThemeMode';
import type { ThemePreference } from '@/theme/themeMode';

const themeOptions: Array<{ value: ThemePreference; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Match browser' },
];

export default function Topbar() {
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

  const handleThemeChange = (nextMode: ThemePreference) => {
    setMode(nextMode);
    handleThemeClose();
  };

  return (
    <Box
      component="header"
      sx={{
        height: 56,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        borderBottom: '1px solid #DFE1E6',
        bgcolor: '#FFFFFF',
      }}
    >
      <IconButton
        size="small"
        sx={{
          borderRadius: 1,
          width: 32,
          height: 32,
          bgcolor: 'transparent',
          color: '#42526E',
          '&:hover': {
            bgcolor: '#F0F1F2',
          },
        }}
      >
        <PanelRightClose size={16} strokeWidth={2} />
      </IconButton>

      <IconButton size="small" sx={{ color: '#42526E' }}>
        <AppsIcon fontSize="small" />
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            bgcolor: '#0052CC',
            borderRadius: 1,
            display: 'grid',
            placeItems: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
          }}
        >
          J
        </Box>
        <Typography fontWeight={600} color="#172B4D">
          Jira
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <TextField
          placeholder="Search"
          size="small"
          sx={{
            width: 'min(640px, 100%)',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#FFFFFF',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: '#6B778C' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          textTransform: 'none',
          bgcolor: '#0C66E4',
          boxShadow: 'none',
          '&:hover': { bgcolor: '#0055CC', boxShadow: 'none' },
        }}
      >
        Create
      </Button>

      <Button
        variant="outlined"
        startIcon={
          <Box
            sx={{
              width: 18,
              height: 18,
              border: '1px solid #B15BFF',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              color: '#B15BFF',
              fontSize: 12,
            }}
          >
            ♦
          </Box>
        }
        sx={{
          textTransform: 'none',
          borderColor: '#B15BFF',
          color: '#6B2FBF',
          '&:hover': { borderColor: '#8F27E8', bgcolor: '#F7F0FF' },
        }}
      >
        Upgrade
      </Button>

      <IconButton size="small" sx={{ color: '#42526E' }}>
        <NotificationsNoneIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ color: '#42526E' }}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" sx={{ color: '#42526E' }}>
        <SettingsOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        onClick={handleMenuOpen}
        sx={{ p: 0 }}
        aria-label="User menu"
        aria-controls={menuOpen ? 'topbar-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#0B875B',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          H
        </Avatar>
      </IconButton>

      <Menu
        id="topbar-user-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 260,
            borderRadius: 2,
            boxShadow: '0 12px 24px rgba(9, 30, 66, 0.18)',
            p: 1,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: '#F7F8F9',
            borderRadius: 2,
            px: 2,
            py: 1.5,
            mb: 1,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: '#0B875B',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            H
          </Avatar>
          <Box>
            <Typography fontWeight={700} color="#172B4D">
              Hiếu Đào
            </Typography>
            <Typography variant="body2" color="#6B778C">
              dnhieu92@gmail.com
            </Typography>
          </Box>
        </Box>

        <MenuItem sx={{ gap: 1.5 }}>
          <PersonOutlineOutlinedIcon fontSize="small" />
          Profile
        </MenuItem>
        <MenuItem sx={{ gap: 1.5 }}>
          <ManageAccountsOutlinedIcon fontSize="small" />
          Account settings
        </MenuItem>
        <MenuItem
          onClick={handleThemeOpen}
          selected={themeMenuOpen}
          aria-haspopup="true"
          aria-controls={themeMenuOpen ? 'topbar-theme-menu' : undefined}
          aria-expanded={themeMenuOpen ? 'true' : undefined}
          sx={{
            gap: 1.5,
            '&.Mui-selected': {
              bgcolor: 'rgb(var(--color-primary) / 0.14)',
              color: 'rgb(var(--color-primary))',
            },
            '&.Mui-selected:hover': {
              bgcolor: 'rgb(var(--color-primary) / 0.2)',
            },
          }}
        >
          <Brightness4OutlinedIcon fontSize="small" />
          Theme
          <Box
            sx={{
              marginLeft: 'auto',
              color: themeMenuOpen
                ? 'rgb(var(--color-primary))'
                : 'rgb(var(--color-text-muted))',
            }}
          >
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
            sx: {
              mt: -0.5,
              mr: 0.5,
              minWidth: 300,
              borderRadius: 2,
              border: '1px solid rgb(var(--color-border))',
              boxShadow: '0 12px 24px rgba(9, 30, 66, 0.18)',
              p: 0.5,
              bgcolor: 'rgb(var(--color-surface))',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {themeOptions.map((option) => {
              const selected = preference === option.value;

              return (
                <MenuItem
                  key={option.value}
                  onClick={() => handleThemeChange(option.value)}
                  selected={selected}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '24px 88px 1fr',
                    alignItems: 'center',
                    gap: 2,
                    py: 1.25,
                    px: 1.5,
                    borderRadius: 1.5,
                    '&.Mui-selected': {
                      bgcolor: 'rgb(var(--color-primary) / 0.16)',
                    },
                    '&.Mui-selected:hover': {
                      bgcolor: 'rgb(var(--color-primary) / 0.22)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: selected
                        ? '2px solid rgb(var(--color-primary))'
                        : '2px solid rgb(var(--color-border-strong))',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {selected ? (
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          bgcolor: 'rgb(var(--color-primary))',
                        }}
                      />
                    ) : null}
                  </Box>
                  <Box
                    aria-hidden
                    sx={{
                      width: 88,
                      height: 52,
                      borderRadius: 1,
                      border: '1px solid rgb(var(--color-border))',
                      background:
                        option.value === 'dark'
                          ? 'rgb(29 33 37)'
                          : option.value === 'light'
                            ? 'rgb(255 255 255)'
                            : 'linear-gradient(90deg, rgb(29 33 37) 0%, rgb(29 33 37) 50%, rgb(255 255 255) 50%, rgb(255 255 255) 100%)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 4,
                        left: 6,
                        right: 6,
                        height: 6,
                        borderRadius: 99,
                        bgcolor:
                          option.value === 'dark'
                            ? 'rgb(56 65 74)'
                            : 'rgb(223 225 230)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 14,
                        left: 6,
                        width: 18,
                        bottom: 6,
                        borderRadius: 0.5,
                        bgcolor:
                          option.value === 'dark'
                            ? 'rgb(34 39 43)'
                            : 'rgb(244 245 247)',
                      },
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: selected
                          ? 'rgb(var(--color-primary))'
                          : 'rgb(var(--color-text))',
                      }}
                    >
                      {option.label}
                    </Typography>
                    {option.value === 'system' ? (
                      <Typography variant="body2" sx={{ color: 'rgb(var(--color-text-muted))' }}>
                        Current: {mode}
                      </Typography>
                    ) : null}
                  </Box>
                </MenuItem>
              );
            })}
          </Box>
        </Popover>
        <Divider sx={{ my: 1 }} />
        <MenuItem sx={{ gap: 1.5 }}>
          <GroupAddOutlinedIcon fontSize="small" />
          Switch account
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ gap: 1.5, color: '#AE2E24' }}>
          <LogoutOutlinedIcon fontSize="small" />
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
}
