'use client';

import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import type { SxProps, Theme } from '@mui/material/styles';

type UserAvatarSize = 'small' | 'medium' | 'large';

export interface UserAvatarProps extends AvatarProps {
  name: string;
  size?: UserAvatarSize;
}

const sizeStyles: Record<UserAvatarSize, SxProps<Theme>> = {
  small: { width: 28, height: 28, fontSize: 12 },
  medium: { width: 42, height: 42, fontSize: 14 },
  large: { width: 50, height: 50, fontSize: 16 },
};

function hashString(input: string): number {
  let hash = 0;

  for (let i = 0; i < input.length; i += 1) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }

  return Math.abs(hash);
}

function getAvatarColor(name: string): string {
  const hash = hashString(name.trim().toLowerCase());
  const hue = hash % 360;

  // Keep saturation/lightness stable for readable white text.
  return `hsl(${hue} 72% 38%)`;
}

function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return '?';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

export default function UserAvatar({
  name,
  size = 'medium',
  children,
  sx,
  ...props
}: UserAvatarProps) {
  const baseSx: SxProps<Theme> = {
    bgcolor: getAvatarColor(name),
    color: '#fff',
    fontWeight: 600,
  };

  const mergedSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseSx, sizeStyles[size], ...sx]
    : [baseSx, sizeStyles[size], sx];

  return (
    <Avatar {...props} sx={mergedSx}>
      {children ?? getInitials(name)}
    </Avatar>
  );
}
