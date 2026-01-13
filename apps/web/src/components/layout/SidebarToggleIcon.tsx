'use client';

import { IconButton } from '@/components/ui';

interface SidebarToggleIconProps {
  onClick: () => void;
  isOpen?: boolean;
}

export default function SidebarToggleIcon({ onClick, isOpen = true }: SidebarToggleIconProps) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      sx={{
        border: '1px solid #DFE1E6',
        borderRadius: 1,
        width: 32,
        height: 32,
        color: '#42526E',
      }}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <svg
        fill="none"
        viewBox="0 0 16 16"
        role="presentation"
        width={16}
        height={16}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M2 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2v-11zm3.5 0v11H14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm7.97 4.47 2.5-2.5 1.06 1.06L9.56 8l1.97 1.97-1.06 1.06-2.5-2.5a.75.75 0 0 1 0-1.06"
          clipRule="evenodd"
        />
      </svg>
    </IconButton>
  );
}
