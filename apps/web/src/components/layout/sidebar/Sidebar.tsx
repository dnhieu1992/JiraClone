'use client';

import { Box, Typography } from '@/components/ui';

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #DFE1E6',
      }}
    >
      <Typography variant="body2" color="#6B778C">
        Sidebar
      </Typography>
    </Box>
  );
}
