import { Box, Button, TextField, Typography } from '@mui/material';

export default function LoginPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 420 }}>
      <Typography variant="h5" fontWeight={700}>
        Login
      </Typography>

      <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <Button variant="contained">Sign in</Button>
      </Box>
    </Box>
  );
}

