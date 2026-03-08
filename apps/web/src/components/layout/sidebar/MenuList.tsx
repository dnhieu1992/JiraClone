'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import CircleUserRound from 'lucide-react/dist/esm/icons/circle-user-round';
import Clock3 from 'lucide-react/dist/esm/icons/clock-3';
import Ellipsis from 'lucide-react/dist/esm/icons/ellipsis';
import Filter from 'lucide-react/dist/esm/icons/filter';
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import Map from 'lucide-react/dist/esm/icons/map';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Star from 'lucide-react/dist/esm/icons/star';
import Target from 'lucide-react/dist/esm/icons/target';
import Users from 'lucide-react/dist/esm/icons/users';
import { Box, ButtonBase, IconButton, Typography } from '@/components/ui';
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
  const recentSpacesDisplay = recentSpaces.slice(0, 6);
  const [spacesExpanded, setSpacesExpanded] = useState(true);

  return (
    <Box className="jira-sidebar-menu-list">
      <Box className="jira-sidebar-menu-group">
        {primaryItems.map((item) => {
          const isPlansItem = item.id === 'plans';

          return (
            <Box key={item.id}>
              {isPlansItem ? (
                <ButtonBase
                  className="jira-sidebar-menu-item jira-sidebar-menu-item--static"
                  aria-label="Plans menu"
                >
                  <Box className="jira-sidebar-menu-item-content">
                    <item.Icon size={16} strokeWidth={1.8} />
                    <Typography className="jira-sidebar-menu-item-label">
                      {item.label}
                    </Typography>
                  </Box>
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className="jira-sidebar-menu-item-right-icon"
                  />
                </ButtonBase>
              ) : (
                <MenuItem
                  path={item.path}
                  label={item.label}
                  Icon={item.Icon}
                  rightIcon={item.rightIcon}
                  active={isActiveItem(pathname, item)}
                />
              )}

              {isPlansItem ? (
                <Box className="jira-sidebar-submenu">
                  <Box className="jira-sidebar-submenu__item">
                    <ButtonBase
                      className="jira-sidebar-submenu__toggle"
                      onClick={() => setSpacesExpanded((prev) => !prev)}
                      aria-expanded={spacesExpanded}
                    >
                      <Box className="jira-sidebar-submenu__toggle-left">
                        <Box className="jira-sidebar-submenu__toggle-icon-slot">
                          <LayoutDashboard
                            size={16}
                            strokeWidth={1.8}
                            className="jira-sidebar-submenu__toggle-icon jira-sidebar-submenu__toggle-icon--space"
                          />
                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className="jira-sidebar-submenu__toggle-icon jira-sidebar-submenu__toggle-icon--arrow"
                          />
                        </Box>
                        <Typography className="jira-sidebar-submenu__toggle-label">
                          Space
                        </Typography>
                      </Box>
                    </ButtonBase>

                    <Box className="jira-sidebar-submenu__actions">
                      <IconButton
                        component={Link}
                        href="/spaces/create"
                        size="small"
                        className="jira-sidebar-submenu__icon-btn"
                        aria-label="Create new space"
                      >
                        <Plus size={14} />
                      </IconButton>
                      <IconButton
                        size="small"
                        className="jira-sidebar-submenu__icon-btn"
                        aria-label="More space actions"
                      >
                        <Ellipsis size={14} />
                      </IconButton>
                    </Box>
                  </Box>

                  {spacesExpanded ? (
                    <Box className="jira-sidebar-submenu__list">
                      {recentSpacesDisplay.map((space) => (
                        <MenuItem
                          key={space.id}
                          path={`/boards/${space.key}`}
                          label={space.name}
                          Icon={LayoutDashboard}
                          active={pathname === `/boards/${space.key}`}
                        />
                      ))}
                    </Box>
                  ) : null}
                </Box>
              ) : null}
            </Box>
          );
        })}
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
