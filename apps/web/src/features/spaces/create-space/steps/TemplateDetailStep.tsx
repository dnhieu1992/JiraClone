'use client';

import { Box, Button, Typography } from '@/components/ui';
import type { SpaceTemplate } from '../types';

type TemplateDetailStepProps = {
  template: SpaceTemplate;
  onChangeTemplate: () => void;
  onUseTemplate: () => void;
};

export default function TemplateDetailStep({
  template,
  onChangeTemplate,
  onUseTemplate,
}: TemplateDetailStepProps) {
  return (
    <Box className="create-space-wizard__template-detail">
      <Box className="create-space-wizard__template-detail-card">
        <Box className="create-space-wizard__template-detail-header">
          <Typography className="create-space-wizard__panel-title">
            {template === 'KANBAN' ? 'Kanban' : template}
          </Typography>
          <Button
            variant="outlined"
            className="create-space-wizard__template-detail-change"
            onClick={onChangeTemplate}
          >
            Change template
          </Button>
        </Box>

        <Typography className="create-space-wizard__panel-description">
          Kanban helps teams visualize flow and move work quickly across clear
          statuses.
        </Typography>

        <Box className="create-space-wizard__template-detail-columns">
          <Box className="create-space-wizard__template-detail-column">
            <Typography className="create-space-wizard__template-detail-column-label">
              TO DO
            </Typography>
          </Box>
          <Box className="create-space-wizard__template-detail-column">
            <Typography className="create-space-wizard__template-detail-column-label">
              IN PROGRESS
            </Typography>
          </Box>
          <Box className="create-space-wizard__template-detail-column">
            <Typography className="create-space-wizard__template-detail-column-label">
              DONE
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="create-space-wizard__template-detail-footer">
        <Button variant="contained" onClick={onUseTemplate}>
          Use template
        </Button>
      </Box>
    </Box>
  );
}
