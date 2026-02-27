'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@/components/ui';
import { JiraSkeletonBackdrop } from '@/components/ui/JiraSkeletonBackdrop';
import { startKeycloakLogin } from '@/features/auth/api';
import '../auth.scss';

export default function LoginPage() {
  useEffect(() => {
    void startKeycloakLogin({});
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Backdrop */}
      <JiraSkeletonBackdrop />

      {/* Login Modal - Center of page */}
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '25vw',
          height: 'calc(100vh - 32px)',
          display: 'flex',
          alignItems: 'stretch',
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            p: 4,
            boxShadow: 3,
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div className="auth-login-brand">
            <div className="auth-login-brand__icon">
              <Typography variant="h5" className="auth-login-brand__icon-text">
                J
              </Typography>
            </div>
            <Typography variant="h5" className="auth-login-brand__name">
              Jira
            </Typography>
          </div>

          <Typography
            variant="h4"
            className="auth-login-title"
          >
            Continue to Jira
          </Typography>
          <Typography variant="body2" className="auth-login-subtitle">
            You will be redirected to Keycloak to complete sign in.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
