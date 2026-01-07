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
  TextField,
  Typography,
} from '@/components/ui';
import {
  AddIcon,
  AppsIcon,
  ArrowBackIosNewIcon,
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
import { startKeycloakLogout } from '@/features/auth/api';

export default function Topbar() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    startKeycloakLogout();
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
          border: '1px solid #DFE1E6',
          borderRadius: 1,
          width: 32,
          height: 32,
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
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
        <MenuItem sx={{ gap: 1.5 }}>
          <Brightness4OutlinedIcon fontSize="small" />
          Theme
          <Box sx={{ marginLeft: 'auto', color: '#6B778C' }}>›</Box>
        </MenuItem>
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
