import React from 'react';
import { Box } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ width: 260, p: 2, borderRight: '1px solid #e5e7eb' }}>Sidebar</Box>
      <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
    </Box>
  );
}

