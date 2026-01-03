'use client';

import { Box, ButtonBase, Divider, IconButton, Typography } from '@/components/ui';
import {
  AccessTimeIcon,
  AppsIcon,
  ChevronRightIcon,
  DashboardOutlinedIcon,
  EventNoteIcon,
  FilterListIcon,
  GroupsIcon,
  LightbulbOutlinedIcon,
  MoreHorizIcon,
  OpenInNewIcon,
  PersonOutlineIcon,
  PublicIcon,
  SettingsOutlinedIcon,
  StarBorderIcon,
  TrackChangesIcon,
  TuneIcon,
  ViewAgendaIcon,
  AddIcon,
} from '@/components/ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  withChevron?: boolean;
};

const topItems: NavItem[] = [
  { label: 'For you', icon: <PersonOutlineIcon fontSize="small" /> },
  { label: 'Recent', icon: <AccessTimeIcon fontSize="small" />, withChevron: true },
  { label: 'Starred', icon: <StarBorderIcon fontSize="small" />, withChevron: true },
  { label: 'Apps', icon: <AppsIcon fontSize="small" /> },
  { label: 'Plans', icon: <EventNoteIcon fontSize="small" />, withChevron: true },
];

const recommendedItems: NavItem[] = [
  { label: 'Filters', icon: <FilterListIcon fontSize="small" /> },
  { label: 'Dashboards', icon: <DashboardOutlinedIcon fontSize="small" /> },
];

const externalItems: NavItem[] = [
  { label: 'Goals', icon: <TrackChangesIcon fontSize="small" /> },
  { label: 'Teams', icon: <GroupsIcon fontSize="small" /> },
];

function SidebarRow({
  icon,
  label,
  rightAdornment,
  active,
  muted,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  rightAdornment?: React.ReactNode;
  active?: boolean;
  muted?: boolean;
  href?: string;
}) {
  const content = (
    <ButtonBase
      sx={{
        width: '100%',
        justifyContent: 'space-between',
        textAlign: 'left',
        borderRadius: 2,
        px: 1.5,
        py: 1,
        color: muted ? '#6B778C' : '#44546F',
        position: 'relative',
        backgroundColor: active ? '#E9F2FF' : 'transparent',
        '&:hover': {
          backgroundColor: active ? '#E0ECFF' : '#F4F5F7',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ color: muted ? '#8C9BAB' : '#44546F' }}>{icon}</Box>
        <Typography
          variant="body1"
          sx={{ fontWeight: 600, fontSize: 16 }}
        >
          {label}
        </Typography>
      </Box>
      {rightAdornment ? (
        <Box sx={{ color: '#6B778C', display: 'flex', alignItems: 'center' }}>
          {rightAdornment}
        </Box>
      ) : null}
      {active ? (
        <Box
          sx={{
            position: 'absolute',
            left: 6,
            top: 8,
            bottom: 8,
            width: 3,
            borderRadius: 2,
            bgcolor: '#0C66E4',
          }}
        />
      ) : null}
    </ButtonBase>
  );
  if (href) {
    return (
      <Box component={Link} href={href} sx={{ textDecoration: 'none' }}>
        {content}
      </Box>
    );
  }
  return content;
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <Box
      sx={{
        width: 260,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#FFFFFF',
        borderRight: '1px solid #DFE1E6',
      }}
    >
      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {topItems.map((item) => (
          <SidebarRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            rightAdornment={
              item.withChevron ? <ChevronRightIcon fontSize="small" /> : null
            }
          />
        ))}
      </Box>

      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <PublicIcon fontSize="small" sx={{ color: '#44546F' }} />
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#44546F' }}>
            Spaces
          </Typography>
        </Box>
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="body2" sx={{ color: '#6B778C', fontWeight: 600, mb: 1 }}>
          Recent
        </Typography>
        <SidebarRow
          icon={
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                bgcolor: '#1D7AFC',
                color: '#FFFFFF',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              M
            </Box>
          }
          label="MVP"
          active
        />
        <SidebarRow
          icon={<ViewAgendaIcon fontSize="small" />}
          label="View all spaces"
          muted
        />
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="body2" sx={{ color: '#6B778C', fontWeight: 600, mb: 1 }}>
          Recommended
        </Typography>
        <SidebarRow
          icon={
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                bgcolor: '#F3E8FF',
                color: '#7C3AED',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              <LightbulbOutlinedIcon fontSize="inherit" />
            </Box>
          }
          label="Prioritize ideas"
          rightAdornment={
            <Box
              sx={{
                border: '1px solid #B15BFF',
                color: '#6B2FBF',
                borderRadius: 1,
                px: 0.75,
                py: 0.25,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              TRY
            </Box>
          }
        />
        {recommendedItems.map((item) => (
          <SidebarRow key={item.label} icon={item.icon} label={item.label} />
        ))}
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        {externalItems.map((item) => (
          <SidebarRow
            key={item.label}
            icon={item.icon}
            label={item.label}
            rightAdornment={<OpenInNewIcon fontSize="small" />}
          />
        ))}
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Typography variant="body2" sx={{ color: '#6B778C', fontWeight: 600, mb: 1 }}>
          Admin
        </Typography>
        <SidebarRow
          icon={<SettingsOutlinedIcon fontSize="small" />}
          label="User management"
          href="/admin/users"
          active={pathname === '/admin/users'}
        />
      </Box>

      <Box sx={{ px: 2, mt: 'auto', pb: 2 }}>
        <Divider sx={{ mb: 1.5 }} />
        <SidebarRow
          icon={<TuneIcon fontSize="small" />}
          label="Customize sidebar"
        />
      </Box>
    </Box>
  );
}
