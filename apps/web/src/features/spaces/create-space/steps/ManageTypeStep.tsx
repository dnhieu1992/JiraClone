'use client';

import { Box, Button, Typography } from '@/components/ui';
import type { SpaceManageType } from '../types';

type ManageTypeStepProps = {
  selectedManageType: SpaceManageType | null;
  onSelectAndContinue: (type: SpaceManageType) => void;
};

const OPTIONS: Array<{
  type: SpaceManageType;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
}> = [
  {
    type: 'TEAM_MANAGED',
    title: 'Team-managed',
    description: 'Set up and maintained by your team.',
    bullets: [
      'Anyone on your team can set up and maintain',
      'Settings do not impact other spaces',
      'Simple setup for workflows and fields',
    ],
    cta: 'Select a team-managed space',
  },
  {
    type: 'COMPANY_MANAGED',
    title: 'Company-managed',
    description: 'Set up and maintained by Jira admins.',
    bullets: [
      'Standardized configuration shared across spaces',
      'Advanced control for workflows and work types',
      'Suitable for large organizations',
    ],
    cta: 'Select a company-managed space',
  },
];

export default function ManageTypeStep({
  selectedManageType,
  onSelectAndContinue,
}: ManageTypeStepProps) {
  return (
    <Box className="create-space-wizard__manage-type">
      <Typography className="create-space-wizard__panel-title">
        Select how your space is managed
      </Typography>
      <Typography className="create-space-wizard__panel-description">
        Choose management type for this space. You can create another space
        later if you need a different type.
      </Typography>

      <Box className="create-space-wizard__manage-alert">
        <Typography className="create-space-wizard__manage-alert-text">
          You will need to create a new space if you later decide to change how
          it is managed.
        </Typography>
      </Box>

      <Box className="create-space-wizard__manage-grid">
        {OPTIONS.map((option) => {
          const isSelected = selectedManageType === option.type;
          return (
            <Box
              key={option.type}
              className={`create-space-wizard__manage-card ${
                isSelected ? 'create-space-wizard__manage-card--selected' : ''
              }`}
            >
              <Typography className="create-space-wizard__manage-card-title">
                {option.title}
              </Typography>
              <Typography className="create-space-wizard__manage-card-description">
                {option.description}
              </Typography>

              <Box className="create-space-wizard__manage-card-list">
                {option.bullets.map((bullet) => (
                  <Typography
                    key={bullet}
                    className="create-space-wizard__manage-card-bullet"
                  >
                    {bullet}
                  </Typography>
                ))}
              </Box>

              <Button
                variant={isSelected ? 'contained' : 'outlined'}
                className="create-space-wizard__manage-card-cta"
                onClick={() => onSelectAndContinue(option.type)}
              >
                {option.cta}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
