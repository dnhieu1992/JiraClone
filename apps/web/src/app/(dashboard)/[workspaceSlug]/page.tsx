import { Typography } from '@mui/material';

export default function WorkspacePage({ params }: { params: { workspaceSlug: string } }) {
  return <Typography variant="h6">Workspace: {params.workspaceSlug}</Typography>;
}

