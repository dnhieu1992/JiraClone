import React from 'react';
import Sidebar from './sidebar/Sidebar';
import Topbar from './topbar';
import { Box } from '@/components/ui';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box className="min-h-screen flex flex-col bg-bg text-text">
      <Topbar />
      <Box className="flex flex-1 bg-bg">
        <Sidebar />
        <Box
          component="main"
          className="flex-1 p-6 bg-bg overflow-auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
