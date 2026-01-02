import { Typography } from '@/components/ui';

export default function WorkspacePage({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return (
    <Typography variant="h6">Workspace: {params.workspaceSlug}</Typography>
  );
}
