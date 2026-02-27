'use client';

import { useEffect, useRef, useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Topbar from './topbar';
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

  const handleTopbarCollapseClick = () => {
    if (pinnedExpanded) {
      setPinnedExpanded(false);
      setCollapsedOverlayOpen(false);
      return;
    }

    setPinnedExpanded(true);
    setCollapsedOverlayOpen(false);
  };

  const handleTopbarCollapseMouseEnter = () => {
    if (pinnedExpanded) {
      return;
    }
    clearOverlayCloseTimeout();
    setCollapsedOverlayOpen(true);
  };

  const handleTopbarCollapseMouseLeave = () => {
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
    <Box className="min-h-screen flex flex-col bg-bg text-text">
      <Topbar
        onCollapseClick={handleTopbarCollapseClick}
        onCollapseMouseEnter={handleTopbarCollapseMouseEnter}
        onCollapseMouseLeave={handleTopbarCollapseMouseLeave}
      />
      <Box className="flex flex-1 bg-bg">
        {pinnedExpanded ? (
          <Sidebar
            mode="pinned"
            onCollapsePinned={() => setPinnedExpanded(false)}
          />
        ) : null}

        {!pinnedExpanded && collapsedOverlayOpen ? (
          <>
            <Box
              className="fixed inset-x-0 bottom-0 top-14 z-[1200]"
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
          className="flex-1 p-6 bg-bg overflow-auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
