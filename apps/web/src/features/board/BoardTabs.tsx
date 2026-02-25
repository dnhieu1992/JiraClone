'use client';

import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabPanel from '@/components/ui/TabPanel';
import Tabs from '@mui/material/Tabs';
import KanbanBoard from './KanbanBoard';

export default function BoardTabs() {
  const [value, setValue] = React.useState<number>(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        <Tab label="Board" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <KanbanBoard />
      </TabPanel>
    </Box>
  );
}
