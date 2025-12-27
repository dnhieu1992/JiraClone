import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700}>
        Jira Clone (NextJS)
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Go to <Link href="/login">Login</Link>
      </Typography>
    </Box>
  );
}
