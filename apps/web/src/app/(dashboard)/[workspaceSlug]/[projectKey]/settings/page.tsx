import { Typography } from '@/components/ui';

export default function SettingsPage({
  params,
}: {
  params: { workspaceSlug: string; projectKey: string };
}) {
  return (
    <Typography variant="h6">
      Settings: {params.workspaceSlug} / {params.projectKey}
    </Typography>
  );
}
