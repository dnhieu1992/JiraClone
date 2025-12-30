'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Box,
  Divider,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { JiraSkeletonBackdrop } from '@/components/ui/JiraSkeletonBackdrop';

// Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form data:', data);
    // TODO: Implement login logic
  };

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
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
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
            }}
          >
            {/* Jira Logo */}
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

            {/* Title */}
            <Typography
              variant="h4"
              className="font-semibold mb-6 text-[#172B4D]"
            >
              Log in to continue
            </Typography>

            {/* Email Input */}
            <div className="mb-4">
              <Typography
                variant="body2"
                className="mb-2 font-semibold text-[#172B4D]"
              >
                Email *
              </Typography>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      placeholder="Enter your email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      className="[&_.MuiOutlinedInput-root]:rounded [&_.MuiOutlinedInput-root]:h-[42px]"
                    />
                  </>
                )}
              />
            </div>

            {/* Remember Me Checkbox */}
            <Controller
              name="rememberMe"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={value} onChange={onChange} />
                  }
                  label={
                    <div className="flex items-center gap-1">
                      <Typography variant="body2" className="text-[#172B4D]">
                        Remember my login information
                      </Typography>
                      <div className="w-4 h-4 rounded-full bg-[#6B778C] flex items-center justify-center text-white text-[10px] cursor-help">
                        i
                      </div>
                    </div>
                  }
                  className="mb-6"
                />
              )}
            />

            {/* Continue Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              className="bg-[#0052CC] text-white py-3 rounded normal-case font-semibold mb-6 hover:bg-[#0065FF] disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
            </Button>

            {/* Divider - Passkey */}
            <Divider className="my-6">
              <Typography variant="body2" className="text-[#6B778C] px-2">
                Or log in with:
              </Typography>
            </Divider>

            {/* Passkey Button */}
            <Button
              fullWidth
              variant="outlined"
              type="button"
              startIcon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              className="border-[#DFE1E6] text-[#172B4D] py-3 rounded normal-case mb-6 hover:border-[#B3BAC5] hover:bg-[#F4F5F7]"
            >
              Passkey
            </Button>

            {/* Divider - Social Login */}
            <Divider className="my-6">
              <Typography variant="body2" className="text-[#6B778C] px-2">
                Or continue with:
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Google */}
              <Button
                variant="outlined"
                type="button"
                startIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
                className="border-[#DFE1E6] text-[#172B4D] py-3 rounded normal-case hover:border-[#B3BAC5] hover:bg-[#F4F5F7]"
              >
                Google
              </Button>

              {/* Microsoft */}
              <Button
                variant="outlined"
                type="button"
                startIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M13 1h10v10H13z" />
                    <path fill="#7FBA00" d="M1 13h10v10H1z" />
                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                  </svg>
                }
                className="border-[#DFE1E6] text-[#172B4D] py-3 rounded normal-case hover:border-[#B3BAC5] hover:bg-[#F4F5F7]"
              >
                Microsoft
              </Button>

              {/* Apple */}
              <Button
                variant="outlined"
                type="button"
                startIcon={
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                }
                className="border-[#DFE1E6] text-[#172B4D] py-3 rounded normal-case hover:border-[#B3BAC5] hover:bg-[#F4F5F7]"
              >
                Apple
              </Button>

              {/* Slack */}
              <Button
                variant="outlined"
                type="button"
                startIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#E01E5A"
                      d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
                    />
                    <path
                      fill="#36C5F0"
                      d="M18.956 5.042a2.528 2.528 0 0 1 2.522-2.52A2.528 2.528 0 0 1 24 5.042a2.528 2.528 0 0 1-2.522 2.52h-2.52V5.042zM17.688 5.042a2.528 2.528 0 0 1-2.523 2.52 2.527 2.527 0 0 1-2.52-2.52V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v2.52zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.52h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
                    />
                  </svg>
                }
                className="border-[#DFE1E6] text-[#172B4D] py-3 rounded normal-case hover:border-[#B3BAC5] hover:bg-[#F4F5F7]"
              >
                Slack
              </Button>
            </div>

            {/* Bottom Links */}
            <div className="flex justify-between items-center pt-4 border-t border-[#DFE1E6]">
              <Link
                href="#"
                className="text-[#0052CC] no-underline text-sm hover:underline"
              >
                Can&apos;t log in?
              </Link>
              <Link
                href="/register"
                className="text-[#0052CC] no-underline text-sm hover:underline"
              >
                Create account
              </Link>
            </div>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
