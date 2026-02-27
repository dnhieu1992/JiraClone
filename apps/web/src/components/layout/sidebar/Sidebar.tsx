'use client';

import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import PanelRightOpen from 'lucide-react/dist/esm/icons/panel-right-open';
import LogoIcon from '@/components/layout/topbar/Logo';
import { Box, ButtonBase, IconButton, Typography } from '@/components/ui';
import MenuList from './MenuList';

type SidebarProps = {
  mode?: 'pinned' | 'overlay';
  showHeader?: boolean;
  onCollapsePinned?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export default function Sidebar({
  mode = 'pinned',
  showHeader = true,
  onCollapsePinned,
  onMouseEnter,
  onMouseLeave,
}: SidebarProps) {
  const isOverlay = mode === 'overlay';

  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`fixed left-0 z-[1300] w-[260px] border-r border-border bg-inherit ${
        isOverlay ? 'top-14 h-[calc(100vh-56px)] animate-sidebar-slide-in shadow-2xl' : 'top-0 h-screen'
      }`}
    >
      {showHeader ? (
        <Box className="flex h-14 items-center justify-between pl-2 pr-4">
          <Box className="flex items-center gap-2">
            <IconButton size="small" className="h-8 w-8" aria-label="Open apps">
              <LayoutGrid size={16} strokeWidth={2} />
            </IconButton>

            <ButtonBase className="flex h-8 items-center gap-1 rounded px-1 hover:bg-[rgb(var(--color-surface-hover))]">
              <Box className="h-[20px] w-[20px] shrink-0">
                <LogoIcon />
              </Box>
              <Typography fontWeight={600} className="text-text">
                Jira
              </Typography>
            </ButtonBase>
          </Box>
          <IconButton
            size="small"
            className="h-8 w-8"
            aria-label="Collapse sidebar"
            onClick={onCollapsePinned}
          >
            <PanelRightOpen size={16} strokeWidth={2} />
          </IconButton>
        </Box>
      ) : null}
      <MenuList />
    </Box>
  );
}
