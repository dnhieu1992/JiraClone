'use client';

import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import PanelRightOpen from 'lucide-react/dist/esm/icons/panel-right-open';
import LogoIcon from '@/components/layout/header/Logo';
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
      className={`jira-sidebar ${
        isOverlay ? 'jira-sidebar--overlay' : 'jira-sidebar--pinned'
      }`}
    >
      {showHeader ? (
        <Box className="jira-sidebar__header">
          <Box className="jira-sidebar__header-left">
            <IconButton size="small" className="jira-sidebar__icon-btn" aria-label="Open apps">
              <LayoutGrid size={16} strokeWidth={2} />
            </IconButton>

            <ButtonBase className="jira-sidebar__brand-btn">
              <Box className="jira-sidebar__brand-logo">
                <LogoIcon />
              </Box>
              <Typography className="jira-sidebar__brand-text">
                Jira
              </Typography>
            </ButtonBase>
          </Box>
          <IconButton
            size="small"
            className="jira-sidebar__icon-btn"
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
