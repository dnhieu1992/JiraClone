'use client';

import { useEffect, useRef, useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Header from './header';
import { Box } from '@/components/ui';

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'jira.sidebar.collapsed';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pinnedExpanded, setPinnedExpanded] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) !== 'true';
  });
  const [collapsedOverlayOpen, setCollapsedOverlayOpen] = useState(false);
  const closeOverlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearOverlayCloseTimeout = () => {
    if (closeOverlayTimeoutRef.current) {
      clearTimeout(closeOverlayTimeoutRef.current);
      closeOverlayTimeoutRef.current = null;
    }
  };

  const scheduleOverlayClose = () => {
    clearOverlayCloseTimeout();
    closeOverlayTimeoutRef.current = setTimeout(() => {
      setCollapsedOverlayOpen(false);
    }, 120);
  };

  const handleHeaderCollapseClick = () => {
    if (pinnedExpanded) {
      setPinnedExpanded(false);
      setCollapsedOverlayOpen(false);
      return;
    }

    setPinnedExpanded(true);
    setCollapsedOverlayOpen(false);
  };

  const handleHeaderCollapseMouseEnter = () => {
    if (pinnedExpanded) {
      return;
    }
    clearOverlayCloseTimeout();
    setCollapsedOverlayOpen(true);
  };

  const handleHeaderCollapseMouseLeave = () => {
    if (!pinnedExpanded) {
      scheduleOverlayClose();
    }
  };

  const handleOverlayMouseEnter = () => {
    clearOverlayCloseTimeout();
    setCollapsedOverlayOpen(true);
  };

  const handleOverlayMouseLeave = () => {
    scheduleOverlayClose();
  };

  useEffect(() => {
    window.localStorage.setItem(
      SIDEBAR_COLLAPSED_STORAGE_KEY,
      String(!pinnedExpanded),
    );
  }, [pinnedExpanded]);

  useEffect(() => {
    return () => {
      clearOverlayCloseTimeout();
    };
  }, []);

  return (
    <Box className="app-shell">
      <Header
        onCollapseClick={handleHeaderCollapseClick}
        onCollapseMouseEnter={handleHeaderCollapseMouseEnter}
        onCollapseMouseLeave={handleHeaderCollapseMouseLeave}
      />
      <Box className="app-shell-content">
        {pinnedExpanded ? (
          <Sidebar
            mode="pinned"
            onCollapsePinned={() => setPinnedExpanded(false)}
          />
        ) : null}

        {!pinnedExpanded && collapsedOverlayOpen ? (
          <>
            <Box
              className="app-shell-overlay-backdrop"
              onClick={() => setCollapsedOverlayOpen(false)}
            />
            <Sidebar
              mode="overlay"
              showHeader={false}
              onCollapsePinned={() => setCollapsedOverlayOpen(false)}
              onMouseEnter={handleOverlayMouseEnter}
              onMouseLeave={handleOverlayMouseLeave}
            />
          </>
        ) : null}

        <Box
          component="main"
          className={`app-shell-main ${
            pinnedExpanded ? 'app-shell-main--with-sidebar' : ''
          }`}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
