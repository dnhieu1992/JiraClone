import { Typography } from '@mui/material';

export default function BoardPage({
  params,
}: {
  params: { workspaceSlug: string; projectKey: string };
}) {
  return (
    <Typography variant="h6">
      Board: {params.workspaceSlug} / {params.projectKey}
    </Typography>
  );
}

