import { Box, Button, TextField, Typography } from '@/components/ui';

export default function RegisterPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 420 }}>
      <Typography variant="h5" fontWeight={700}>
        Register
      </Typography>

      <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
        <TextField label="Name" />
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <Button variant="contained">Sign up</Button>
      </Box>
    </Box>
  );
}
