'use client';

import { usePathname } from 'next/navigation';
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
import { Box } from '@/components/ui';
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
  { id: 'for-you', label: 'For you', Icon: CircleUserRound, path: '/', type: 'exact' },
  { id: 'recent', label: 'Recent', Icon: Clock3, path: '/boards/recent', type: 'startsWith', rightIcon: 'chevron' },
  { id: 'starred', label: 'Starred', Icon: Star, path: '/boards/starred', type: 'startsWith', rightIcon: 'chevron' },
  { id: 'apps', label: 'Apps', Icon: LayoutGrid, path: '/apps', type: 'startsWith' },
  { id: 'plans', label: 'Plans', Icon: Map, path: '/plans', type: 'startsWith', rightIcon: 'chevron' },
  { id: 'spaces', label: 'Spaces', Icon: LayoutDashboard, path: '/spaces', type: 'startsWith' },
  { id: 'filters', label: 'Filters', Icon: Filter, path: '/filters', type: 'startsWith' },
  { id: 'dashboards', label: 'Dashboards', Icon: LayoutDashboard, path: '/dashboards', type: 'startsWith' },
];

const secondaryItems: SidebarMenuConfig[] = [
  { id: 'goals', label: 'Goals', Icon: Target, path: '/goals', type: 'startsWith', rightIcon: 'external' },
  { id: 'teams', label: 'Teams', Icon: Users, path: '/teams', type: 'startsWith', rightIcon: 'external' },
];

const moreItems: SidebarMenuConfig[] = [
  { id: 'more', label: 'More', Icon: Ellipsis, path: '/more', type: 'startsWith' },
];

function isActiveItem(pathname: string, item: SidebarMenuConfig) {
  if (item.type === 'exact') {
    return pathname === item.path;
  }

  return pathname.startsWith(item.path);
}

export default function MenuList() {
  const pathname = usePathname();

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
