'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@/components/ui';
import { handleKeycloakCallback } from '@/features/auth/api';

export default function KeycloakCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        await handleKeycloakCallback();
        window.location.assign('/');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed.';
        setError(message);
      }
    };

    void run();
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {error ? (
        <>
          <Typography variant="h6" color="error">
            Login failed
          </Typography>
          <Typography variant="body2">{error}</Typography>
        </>
      ) : (
        <>
          <CircularProgress />
          <Typography variant="body2">Completing login...</Typography>
        </>
      )}
    </Box>
  );
}
