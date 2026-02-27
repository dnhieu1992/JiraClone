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
      className="topbar"
    >
      <Box className="topbar__left">
        <Box className="topbar__left-actions">
          <IconButton
            size="small"
            className="topbar__icon-btn"
            aria-label="Toggle sidebar"
            onClick={onCollapseClick}
            onMouseEnter={onCollapseMouseEnter}
            onMouseLeave={onCollapseMouseLeave}
          >
            <PanelRightClose size={16} strokeWidth={2} />
          </IconButton>

          <IconButton size="small" className="topbar__icon-btn" aria-label="Open apps">
            <LayoutGrid size={16} strokeWidth={2} />
          </IconButton>

          <ButtonBase
            className="topbar__brand-btn"
          >
            <Box className="topbar__brand-logo">
              <LogoIcon />
            </Box>
            <Typography fontWeight={600}>
              Jira
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
      <Box className="topbar__center">
        <Box className="topbar__center-content">
          <TextField
            placeholder="Search"
            size="small"
            className="topbar__search"
            InputProps={{
              className:
                'topbar-search-input',
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            className="topbar__create-btn"
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box className="topbar__right">
        <TopNav />
      </Box>
    </Box>
  );
}
