'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@/components/ui';
import { getValidAccessToken } from '@/features/auth/api';
import AppShell from '@/components/layout/AppShell';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      const token = await getValidAccessToken();
      if (!active) {
        return;
      }
      if (!token) {
        router.replace('/login');
        return;
      }
      setAccessToken(token);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
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

  return <AppShell>home page</AppShell>;
}
