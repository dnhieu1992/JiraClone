'use client';

import { Box, Button, Typography } from '@/components/ui';
import type { SpaceTemplate } from '../types';

type TemplateGalleryStepProps = {
  selectedTemplate: SpaceTemplate;
  onOpenTemplateDetail: (template: SpaceTemplate) => void;
};

export default function TemplateGalleryStep({
  selectedTemplate,
  onOpenTemplateDetail,
}: TemplateGalleryStepProps) {
  return (
    <Box className="create-space-wizard__template-gallery">
      <Typography className="create-space-wizard__panel-title">
        Space templates
      </Typography>
      <Typography className="create-space-wizard__panel-description">
        Choose a template to start your space. Kanban is supported in this
        phase.
      </Typography>

      <Box className="create-space-wizard__template-grid">
        <Button
          variant="text"
          className="create-space-wizard__template-card create-space-wizard__template-card--active"
          onClick={() => onOpenTemplateDetail('KANBAN')}
        >
          <Box className="create-space-wizard__template-card-media" />
          <Typography className="create-space-wizard__template-card-title">
            Kanban
          </Typography>
          <Typography className="create-space-wizard__template-card-desc">
            Visualize work using TO DO, IN PROGRESS, and DONE columns.
          </Typography>
          <Typography className="create-space-wizard__template-card-badge">
            {selectedTemplate === 'KANBAN' ? 'SELECTED' : 'SUPPORTED'}
          </Typography>
        </Button>

        <Box className="create-space-wizard__template-card create-space-wizard__template-card--disabled">
          <Box className="create-space-wizard__template-card-media" />
          <Typography className="create-space-wizard__template-card-title">
            Product roadmap
          </Typography>
          <Typography className="create-space-wizard__template-card-desc">
            Planned for next phases.
          </Typography>
          <Typography className="create-space-wizard__template-card-badge">
            COMING SOON
          </Typography>
        </Box>

        <Box className="create-space-wizard__template-card create-space-wizard__template-card--disabled">
          <Box className="create-space-wizard__template-card-media" />
          <Typography className="create-space-wizard__template-card-title">
            Service management
          </Typography>
          <Typography className="create-space-wizard__template-card-desc">
            Planned for next phases.
          </Typography>
          <Typography className="create-space-wizard__template-card-badge">
            COMING SOON
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
