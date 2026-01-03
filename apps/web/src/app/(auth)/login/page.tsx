'use client';

import { useEffect } from 'react';
import { Box, Typography } from '@/components/ui';
import { JiraSkeletonBackdrop } from '@/components/ui/JiraSkeletonBackdrop';
import { startKeycloakLogin } from '@/features/auth/api';

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
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-[#0052CC] rounded flex items-center justify-center mr-3">
              <Typography variant="h5" className="text-white font-bold">
                J
              </Typography>
            </div>
            <Typography variant="h5" className="font-semibold text-[#172B4D]">
              Jira
            </Typography>
          </div>

          <Typography
            variant="h4"
            className="font-semibold mb-4 text-[#172B4D]"
          >
            Continue to Jira
          </Typography>
          <Typography variant="body2" className="text-[#6B778C] mb-6">
            You will be redirected to Keycloak to complete sign in.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
