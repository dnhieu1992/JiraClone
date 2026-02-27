'use client';

import Link from 'next/link';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

type SidebarItemRightIcon = 'chevron' | 'external' | null;

type SidebarMenuItemProps = {
  path: string;
  label: string;
  active?: boolean;
  rightIcon?: SidebarItemRightIcon;
  Icon: ComponentType<LucideProps>;
};

export default function MenuItem({
  path,
  label,
  active = false,
  rightIcon = null,
  Icon,
}: SidebarMenuItemProps) {
  return (
    <Link
      href={path}
      aria-label={`Go to ${label}`}
      aria-current={active ? 'page' : undefined}
      title={label}
      className={`jira-sidebar-menu-item ${
        active ? 'jira-sidebar-menu-item--active' : ''
      }`}
    >
      {active ? (
        <span className="jira-sidebar-menu-item-indicator" />
      ) : null}

      <div className="jira-sidebar-menu-item-content">
        <Icon size={16} strokeWidth={1.8} />
        <span
          title={label}
          className={`jira-sidebar-menu-item-label ${
            active ? 'jira-sidebar-menu-item-label--active' : ''
          }`}
        >
          {label}
        </span>
      </div>

      {rightIcon === 'chevron' ? (
        <ChevronRight size={16} strokeWidth={2} className="jira-sidebar-menu-item-right-icon" />
      ) : null}

      {rightIcon === 'external' ? (
        <ExternalLink size={16} strokeWidth={2} className="jira-sidebar-menu-item-right-icon" />
      ) : null}
    </Link>
  );
}
