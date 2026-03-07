'use client';

import type { ChangeEvent } from 'react';
import { useMemo } from 'react';
import { Box, Button, TextField, Typography } from '@/components/ui';
import type { CreateSpaceDraft } from '../types';

type InviteMembersStepProps = {
  draft: CreateSpaceDraft;
  onDraftChange: (value: Partial<CreateSpaceDraft>) => void;
  onSkip: () => void;
  onInviteAndContinue: () => void;
};

export default function InviteMembersStep({
  draft,
  onDraftChange,
  onSkip,
  onInviteAndContinue,
}: InviteMembersStepProps) {
  const inviteInputValue = useMemo(
    () => draft.invites.join(', '),
    [draft.invites],
  );

  const handleInviteInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextInvites = event.target.value
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    onDraftChange({ invites: nextInvites });
  };

  return (
    <Box className="create-space-wizard__invite">
      <Box className="create-space-wizard__invite-main">
        <Typography className="create-space-wizard__panel-title">
          Bring your team along
        </Typography>
        <Typography className="create-space-wizard__panel-description">
          Add people you have worked with, or invite someone new.
        </Typography>

        <Box className="create-space-wizard__invite-form">
          <TextField
            label="Enter names or emails"
            value={inviteInputValue}
            onChange={handleInviteInputChange}
            placeholder="john@company.com, jane@company.com"
            fullWidth
          />
          <TextField label="Role" value="Administrator" disabled fullWidth />
        </Box>
      </Box>

      <Box className="create-space-wizard__invite-footer">
        <Button variant="text" onClick={onSkip}>
          Skip
        </Button>
        <Button variant="contained" onClick={onInviteAndContinue}>
          Invite and continue
        </Button>
      </Box>
    </Box>
  );
}
