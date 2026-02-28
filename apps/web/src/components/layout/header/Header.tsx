'use client';
import {
  Box,
  Button,
  ButtonBase,
  Grid,
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
import './header.scss';

type HeaderProps = {
  onCollapseClick?: () => void;
  onCollapseMouseEnter?: () => void;
  onCollapseMouseLeave?: () => void;
};

export default function Header({
  onCollapseClick,
  onCollapseMouseEnter,
  onCollapseMouseLeave,
}: HeaderProps) {
  return (
    <Box component="header" className="header">
      <Grid container wrap="nowrap" className="header__grid">
        <Grid size={3} className="header__left" sx={{ minWidth: 0, flexShrink: 0 }}>
          <Box className="header__left-actions">
            <IconButton
              size="small"
              className="header__icon-btn"
              aria-label="Toggle sidebar"
              onClick={onCollapseClick}
              onMouseEnter={onCollapseMouseEnter}
              onMouseLeave={onCollapseMouseLeave}
            >
              <PanelRightClose size={16} strokeWidth={2} />
            </IconButton>

            <IconButton
              size="small"
              className="header__icon-btn"
              aria-label="Open apps"
            >
              <LayoutGrid size={16} strokeWidth={2} />
            </IconButton>

            <ButtonBase className="header__brand-btn">
              <Box className="header__brand-logo">
                <LogoIcon />
              </Box>
              <Typography fontWeight={600}>Jira</Typography>
            </ButtonBase>
          </Box>
        </Grid>
        <Grid size={6} className="header__center" sx={{ minWidth: 0, flexShrink: 0 }}>
          <Box className="header__center-content">
            <TextField
              placeholder="Search"
              size="small"
              className="header__search"
              InputProps={{
                className: 'header-search-input',
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'var(--ds-text-subtle)' }}>
                    <Search size={18} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              className="header__create-btn"
            >
              Create
            </Button>
          </Box>
        </Grid>
        <Grid size={3} className="header__right" sx={{ minWidth: 0, flexShrink: 0 }}>
          <TopNav />
        </Grid>
      </Grid>
    </Box>
  );
}
