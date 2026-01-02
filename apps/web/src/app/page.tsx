'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@/components/ui';
import { getStoredAuth } from '@/features/auth/api';
import AppShell from '@/components/layout/AppShell';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getStoredAuth();
    if (!auth || auth.expiresAt <= Date.now()) {
      router.replace('/login');
      return;
    }

    setAccessToken(auth.accessToken);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">Loading...</Typography>
      </Box>
    );
  }

  return (
    <AppShell>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          color: '#172B4D',
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Welcome to Jira Clone
        </Typography>
        <Typography variant="body1">
          You are logged in via Keycloak.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(accessToken ?? '')}
          >
            Copy access token
          </Button>
        </Box>
      </Box>
    </AppShell>
  );
}
