'use client';
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@/components/ui';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import PanelRightClose from 'lucide-react/dist/esm/icons/panel-right-close';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Search from 'lucide-react/dist/esm/icons/search';
import LogoIcon from './Logo';
import TopNav from './TopNav';

type TopbarProps = {
  onCollapseClick?: () => void;
  onCollapseMouseEnter?: () => void;
  onCollapseMouseLeave?: () => void;
};

export default function Topbar({
  onCollapseClick,
  onCollapseMouseEnter,
  onCollapseMouseLeave,
}: TopbarProps) {
  return (
    <Box
      component="header"
      className="grid h-14 grid-cols-12 items-center border-b border-border bg-bg px-2"
    >
      <Box className="col-span-3 flex items-center">
        <Box className="flex items-center gap-2" paddingLeft={2}>
          <IconButton
            size="small"
            className="h-8 w-8"
            aria-label="Toggle sidebar"
            onClick={onCollapseClick}
            onMouseEnter={onCollapseMouseEnter}
            onMouseLeave={onCollapseMouseLeave}
          >
            <PanelRightClose size={16} strokeWidth={2} />
          </IconButton>

          <IconButton size="small" className="h-8 w-8" aria-label="Open apps">
            <LayoutGrid size={16} strokeWidth={2} />
          </IconButton>

          <ButtonBase
            className="flex h-8 items-center gap-1"
            sx={{
              px: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgb(var(--color-surface-hover))',
              },
            }}
          >
            <Box className="h-[20px] w-[20px] shrink-0">
              <LogoIcon />
            </Box>
            <Typography fontWeight={600} className="text-text">
              Jira
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
      <Box className="col-span-6 flex items-center justify-center">
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
                  <Search
                    size={18}
                    className="text-[color:var(--ds-text-subtle)]"
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            className="h-9 bg-[rgb(12_102_228)] shadow-none normal-case hover:bg-primary-pressed hover:shadow-none"
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box className="col-span-3 flex items-center justify-end pr-5">
        <TopNav />
      </Box>
    </Box>
  );
}
