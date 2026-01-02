import { Typography } from '@/components/ui';

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
