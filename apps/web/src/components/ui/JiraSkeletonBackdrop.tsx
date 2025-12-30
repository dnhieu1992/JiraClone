'use client';

import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Skeleton,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';

export function JiraSkeletonBackdrop() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        bgcolor: '#F4F5F7', // Muted blue-grey background
      }}
    >
      {/* Top bar */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          bgcolor: 'white',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar 
          sx={{ 
            gap: 1.5,
            minHeight: '48px !important',
            px: 2,
          }}
        >
          {/* Small square logo */}
          <Skeleton variant="rounded" width={24} height={24} animation="wave" />
          {/* Wider rectangular title */}
          <Skeleton variant="rounded" width={120} height={16} animation="wave" />
          <Box sx={{ flex: 1 }} />
          {/* Medium rectangular button */}
          <Skeleton variant="rounded" width={80} height={32} animation="wave" />
          {/* Circular avatar */}
          <Skeleton variant="circular" width={32} height={32} animation="wave" />
        </Toolbar>
      </AppBar>

      {/* Body */}
      <Box sx={{ display: 'flex', height: 'calc(100vh - 48px)' }}>
        {/* Sidebar */}
        <Paper
          square
          elevation={0}
          sx={{
            width: 240,
            borderRight: `1px solid ${theme.palette.divider}`,
            p: 2,
            bgcolor: 'white',
          }}
        >
          {/* Sidebar header */}
          <Skeleton variant="rounded" height={12} width={100} animation="wave" />
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton
                key={`sidebar-item-${i}`}
                variant="rounded"
                height={32}
                width={i % 2 === 0 ? '100%' : '80%'} // Varying widths for visual interest
                animation="wave"
              />
            ))}
          </Box>
        </Paper>

        {/* Main content area */}
        <Box sx={{ flex: 1, p: 3, bgcolor: '#F4F5F7' }}>
          {/* Page title */}
          <Skeleton variant="rounded" height={24} width={200} animation="wave" />
          
          {/* Content cards grid */}
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton
                key={`content-card-${i}`}
                variant="rounded"
                height={120}
                animation="wave"
              />
            ))}
          </Box>
          
          {/* Large content block */}
          <Box sx={{ mt: 3 }}>
            <Skeleton variant="rounded" height={300} animation="wave" />
          </Box>
        </Box>
      </Box>

      {/* Overlay layer with blur to make login stand out */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: alpha(theme.palette.common.white, 0.5),
          backdropFilter: 'blur(3px)',
        }}
      />
    </Box>
  );
}

