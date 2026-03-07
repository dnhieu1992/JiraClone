'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Plus from 'lucide-react/dist/esm/icons/plus';
import CircleUserRound from 'lucide-react/dist/esm/icons/circle-user-round';
import Clock3 from 'lucide-react/dist/esm/icons/clock-3';
import Ellipsis from 'lucide-react/dist/esm/icons/ellipsis';
import Filter from 'lucide-react/dist/esm/icons/filter';
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import Map from 'lucide-react/dist/esm/icons/map';
import Star from 'lucide-react/dist/esm/icons/star';
import Target from 'lucide-react/dist/esm/icons/target';
import Users from 'lucide-react/dist/esm/icons/users';
import { Box, IconButton, Typography } from '@/components/ui';
import { listRecentSpaces } from '@/features/spaces/create-space/mock-store';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';
import MenuItem from './MenuItem';

type SidebarMatchType = 'exact' | 'startsWith';

type SidebarMenuConfig = {
  id: string;
  label: string;
  Icon: ComponentType<LucideProps>;
  path: string;
  type: SidebarMatchType;
  rightIcon?: 'chevron' | 'external';
};

const primaryItems: SidebarMenuConfig[] = [
  {
    id: 'for-you',
    label: 'For you',
    Icon: CircleUserRound,
    path: '/',
    type: 'exact',
  },
  {
    id: 'recent',
    label: 'Recent',
    Icon: Clock3,
    path: '/boards/recent',
    type: 'startsWith',
    rightIcon: 'chevron',
  },
  {
    id: 'starred',
    label: 'Starred',
    Icon: Star,
    path: '/boards/starred',
    type: 'startsWith',
    rightIcon: 'chevron',
  },
  {
    id: 'apps',
    label: 'Apps',
    Icon: LayoutGrid,
    path: '/apps',
    type: 'startsWith',
  },
  {
    id: 'plans',
    label: 'Plans',
    Icon: Map,
    path: '/plans',
    type: 'startsWith',
    rightIcon: 'chevron',
  },
  {
    id: 'filters',
    label: 'Filters',
    Icon: Filter,
    path: '/filters',
    type: 'startsWith',
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    Icon: LayoutDashboard,
    path: '/dashboards',
    type: 'startsWith',
  },
];

const secondaryItems: SidebarMenuConfig[] = [
  {
    id: 'goals',
    label: 'Goals',
    Icon: Target,
    path: '/goals',
    type: 'startsWith',
    rightIcon: 'external',
  },
  {
    id: 'teams',
    label: 'Teams',
    Icon: Users,
    path: '/teams',
    type: 'startsWith',
    rightIcon: 'external',
  },
];

const moreItems: SidebarMenuConfig[] = [
  {
    id: 'more',
    label: 'More',
    Icon: Ellipsis,
    path: '/more',
    type: 'startsWith',
  },
];

function isActiveItem(pathname: string, item: SidebarMenuConfig) {
  if (item.type === 'exact') {
    return pathname === item.path;
  }

  return pathname.startsWith(item.path);
}

export default function MenuList() {
  const pathname = usePathname();
  const recentSpaces = listRecentSpaces();
  const recentSpacesDisplay = recentSpaces.slice(0, 4);

  return (
    <Box className="jira-sidebar-menu-list">
      <Box className="jira-sidebar-menu-group">
        {primaryItems.map((item) => (
          <MenuItem
            key={item.id}
            path={item.path}
            label={item.label}
            Icon={item.Icon}
            rightIcon={item.rightIcon}
            active={isActiveItem(pathname, item)}
          />
        ))}
      </Box>

      <Box className="jira-sidebar-spaces">
        <Box className="jira-sidebar-spaces__header">
          <Box className="jira-sidebar-spaces__header-left">
            <LayoutDashboard size={16} strokeWidth={1.8} />
            <Typography className="jira-sidebar-spaces__header-title">
              Spaces
            </Typography>
          </Box>
          <Box className="jira-sidebar-spaces__header-actions">
            <IconButton
              component={Link}
              href="/spaces/create"
              size="small"
              className="jira-sidebar-spaces__icon-btn"
              aria-label="Create new space"
            >
              <Plus size={14} />
            </IconButton>
            <IconButton
              size="small"
              className="jira-sidebar-spaces__icon-btn"
              aria-label="More space actions"
            >
              <Ellipsis size={14} />
            </IconButton>
          </Box>
        </Box>

        <Typography className="jira-sidebar-spaces__recent-label">
          Recent
        </Typography>

        <Box className="jira-sidebar-menu-group">
          {recentSpacesDisplay.map((space) => (
            <MenuItem
              key={space.id}
              path={`/boards/${space.key}`}
              label={space.name}
              Icon={LayoutDashboard}
              active={pathname === `/boards/${space.key}`}
            />
          ))}

          <MenuItem
            path="/spaces"
            label="More spaces"
            Icon={LayoutGrid}
            rightIcon="chevron"
            active={pathname.startsWith('/spaces')}
          />
        </Box>
      </Box>

      <Box className="jira-sidebar-menu-group jira-sidebar-menu-group--spaced">
        {secondaryItems.map((item) => (
          <MenuItem
            key={item.id}
            path={item.path}
            label={item.label}
            Icon={item.Icon}
            rightIcon={item.rightIcon}
            active={isActiveItem(pathname, item)}
          />
        ))}
      </Box>

      <Box className="jira-sidebar-menu-group jira-sidebar-menu-group--spaced">
        {moreItems.map((item) => (
          <MenuItem
            key={item.id}
            path={item.path}
            label={item.label}
            Icon={item.Icon}
            rightIcon={item.rightIcon}
            active={isActiveItem(pathname, item)}
          />
        ))}
      </Box>
    </Box>
  );
}
