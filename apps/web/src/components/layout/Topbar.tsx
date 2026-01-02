'use client';

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@/components/ui';
import {
  AddIcon,
  AppsIcon,
  ArrowBackIosNewIcon,
  HelpOutlineIcon,
  NotificationsNoneIcon,
  SearchIcon,
  SettingsOutlinedIcon,
} from '@/components/ui/icons';

export default function Topbar() {
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
    </Box>
  );
}
