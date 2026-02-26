'use client';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@/components/ui';
import { AddIcon, SearchIcon } from '@/components/ui/icons';
import { LayoutGrid, PanelRightClose } from 'lucide-react';
import LogoIcon from './Logo';
import TopNav from './TopNav';

function TopbarLeftSection() {
  return (
    <Box className="flex items-center gap-1.5">
      <IconButton
        size="small"
        className="h-8 w-8 rounded !text-[var(--ds-text-subtle)] hover:bg-surface-hover"
      >
        <PanelRightClose size={16} strokeWidth={2} />
      </IconButton>

      <IconButton size="small" className="!text-[var(--ds-text-subtle)]">
        <LayoutGrid size={16} strokeWidth={2} />
      </IconButton>

      <Box className="flex items-center gap-1">
        <Box className="h-7 w-7">
          <LogoIcon />
        </Box>
        <Typography fontWeight={600} className="text-text">
          Jira
        </Typography>
      </Box>
    </Box>
  );
}

function TopbarCenterSection() {
  return (
    <Box className="flex items-center justify-center gap-4">
      <TextField
        placeholder="Search"
        size="small"
        className="w-[320px]"
        InputProps={{
          className:
            'h-9 rounded-lg bg-surface [&_input::placeholder]:text-[color:var(--ds-text-subtle)] [&_input::placeholder]:opacity-100',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-[18px] text-[color:var(--ds-text-subtle)]" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        className="!h-9 !bg-[rgb(12_102_228)] !shadow-none normal-case hover:!bg-primary-pressed hover:!shadow-none"
      >
        Create
      </Button>
    </Box>
  );
}

export default function Topbar() {
  return (
    <Box
      component="header"
      className="grid h-14 grid-cols-12 items-center border-b border-border bg-bg px-2"
    >
      <Box className="col-span-3 flex items-center">
        <TopbarLeftSection />
      </Box>
      <Box className="col-span-6 flex items-center justify-center">
        <TopbarCenterSection />
      </Box>
      <Box className="col-span-3 flex items-center justify-end">
        <TopNav />
      </Box>
    </Box>
  );
}
