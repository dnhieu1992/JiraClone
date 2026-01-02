import React from 'react';
import { Box } from '@/components/ui';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <Box sx={{ flex: 1, display: 'flex', bgcolor: '#F4F5F7' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            bgcolor: '#F4F5F7',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
