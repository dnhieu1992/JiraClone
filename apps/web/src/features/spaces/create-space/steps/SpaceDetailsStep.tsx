'use client';

import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { Box, Button, TextField, Typography } from '@/components/ui';
import { normalizeSpaceKey } from '../mock-store';
import type { CreateSpaceDraft } from '../types';

type SpaceDetailsStepProps = {
  draft: CreateSpaceDraft;
  onDraftChange: (value: Partial<CreateSpaceDraft>) => void;
  onBack: () => void;
  onCreate: () => void;
};

type ValidationErrorState = {
  name: string | null;
  key: string | null;
};

function validateDraft(draft: CreateSpaceDraft): ValidationErrorState {
  const trimmedName = draft.name.trim();
  const normalizedKey = normalizeSpaceKey(draft.key);

  return {
    name: trimmedName.length > 0 ? null : 'Space name is required.',
    key: normalizedKey.length > 0 ? null : 'Space key is required.',
  };
}

export default function SpaceDetailsStep({
  draft,
  onDraftChange,
  onBack,
  onCreate,
}: SpaceDetailsStepProps) {
  const [errors, setErrors] = useState<ValidationErrorState>({
    name: null,
    key: null,
  });

  const normalizedPreviewKey = useMemo(
    () => normalizeSpaceKey(draft.key || draft.name),
    [draft.key, draft.name],
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextName = event.target.value;
    if (draft.key.trim().length === 0) {
      onDraftChange({
        name: nextName,
        key: normalizeSpaceKey(nextName),
      });
    } else {
      onDraftChange({ name: nextName });
    }

    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  const handleKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onDraftChange({ key: event.target.value });
    if (errors.key) {
      setErrors((prev) => ({ ...prev, key: null }));
    }
  };

  const handleCreate = () => {
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.key) {
      return;
    }

    onCreate();
  };

  return (
    <Box className="create-space-wizard__space-details">
      <Typography className="create-space-wizard__panel-title">
        Add space details
      </Typography>
      <Typography className="create-space-wizard__panel-description">
        Required fields are marked with an asterisk.
      </Typography>

      <Box className="create-space-wizard__space-details-grid">
        <Box className="create-space-wizard__space-details-main">
          <TextField
            label="Name *"
            value={draft.name}
            onChange={handleNameChange}
            error={Boolean(errors.name)}
            helperText={errors.name ?? ' '}
            fullWidth
          />
          <TextField
            label="Key *"
            value={draft.key}
            onChange={handleKeyChange}
            error={Boolean(errors.key)}
            helperText={
              errors.key ?? `Preview key: ${normalizedPreviewKey || 'N/A'}`
            }
            fullWidth
          />

          <Box className="create-space-wizard__permissions">
            <Typography className="create-space-wizard__permissions-title">
              Space permissions *
            </Typography>

            <Box className="create-space-wizard__permissions-option create-space-wizard__permissions-option--active">
              <Typography className="create-space-wizard__permissions-option-title">
                Open (Free)
              </Typography>
              <Typography className="create-space-wizard__permissions-option-description">
                Anyone can edit this project.
              </Typography>
            </Box>

            <Box className="create-space-wizard__permissions-option create-space-wizard__permissions-option--disabled">
              <Typography className="create-space-wizard__permissions-option-title">
                Limited (Standard plan)
              </Typography>
              <Typography className="create-space-wizard__permissions-option-description">
                Planned for next phase.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="create-space-wizard__space-details-summary">
          <Typography className="create-space-wizard__space-details-summary-label">
            Template
          </Typography>
          <Typography className="create-space-wizard__space-details-summary-value">
            Kanban
          </Typography>

          <Typography className="create-space-wizard__space-details-summary-label">
            Type
          </Typography>
          <Typography className="create-space-wizard__space-details-summary-value">
            {draft.manageType === 'COMPANY_MANAGED'
              ? 'Company-managed'
              : 'Team-managed'}
          </Typography>
        </Box>
      </Box>

      <Box className="create-space-wizard__space-details-footer">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create space
        </Button>
      </Box>
    </Box>
  );
}
