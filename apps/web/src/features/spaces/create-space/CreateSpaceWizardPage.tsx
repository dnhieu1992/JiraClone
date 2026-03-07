'use client';

import { useMemo, useReducer } from 'react';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import X from 'lucide-react/dist/esm/icons/x';
import { useRouter } from 'next/navigation';
import { Box, Button, IconButton, Typography } from '@/components/ui';
import { createMockSpaceFromDraft, getInitialDraft } from './mock-store';
import InviteMembersStep from './steps/InviteMembersStep';
import ManageTypeStep from './steps/ManageTypeStep';
import SpaceDetailsStep from './steps/SpaceDetailsStep';
import TemplateDetailStep from './steps/TemplateDetailStep';
import TemplateGalleryStep from './steps/TemplateGalleryStep';
import type { CreateSpaceDraft, WizardStep } from './types';
import './create-space-wizard.scss';

const STEP_FLOW: WizardStep[] = [
  'TEMPLATE_GALLERY',
  'TEMPLATE_DETAIL',
  'MANAGE_TYPE',
  'SPACE_DETAILS',
  'INVITE',
];

type WizardState = {
  step: WizardStep;
  draft: CreateSpaceDraft;
  createdSpaceKey: string | null;
};

type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: WizardStep }
  | {
      type: 'UPDATE_DRAFT';
      payload: Partial<CreateSpaceDraft>;
    }
  | { type: 'SET_CREATED_SPACE_KEY'; payload: string | null }
  | { type: 'RESET_DRAFT' };

const STEP_CONTENT: Record<WizardStep, { title: string; description: string }> =
  {
    TEMPLATE_GALLERY: {
      title: 'Choose a template',
      description:
        'Task 2 shell: this step will render Kanban template gallery in Task 3.',
    },
    TEMPLATE_DETAIL: {
      title: 'Template details',
      description:
        'Task 2 shell: this step will show Kanban detail dialog and Use Template action.',
    },
    MANAGE_TYPE: {
      title: 'Select how your space is managed',
      description:
        'Task 2 shell: this step will show Team-managed / Company-managed options.',
    },
    SPACE_DETAILS: {
      title: 'Add space details',
      description:
        'Task 2 shell: this step will contain name/key form and create action.',
    },
    INVITE: {
      title: 'Bring your team along',
      description:
        'Task 2 shell: this step will show invite UI with skip and continue actions.',
    },
  };

function getStepIndex(step: WizardStep): number {
  return STEP_FLOW.indexOf(step);
}

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP': {
      const currentIndex = getStepIndex(state.step);
      if (currentIndex < 0 || currentIndex >= STEP_FLOW.length - 1) {
        return state;
      }

      return {
        ...state,
        step: STEP_FLOW[currentIndex + 1],
      };
    }
    case 'PREV_STEP': {
      const currentIndex = getStepIndex(state.step);
      if (currentIndex <= 0) {
        return state;
      }

      return {
        ...state,
        step: STEP_FLOW[currentIndex - 1],
      };
    }
    case 'GO_TO_STEP':
      return {
        ...state,
        step: action.payload,
      };
    case 'UPDATE_DRAFT':
      return {
        ...state,
        draft: {
          ...state.draft,
          ...action.payload,
        },
      };
    case 'SET_CREATED_SPACE_KEY':
      return {
        ...state,
        createdSpaceKey: action.payload,
      };
    case 'RESET_DRAFT':
      return {
        ...state,
        draft: getInitialDraft(),
        step: STEP_FLOW[0],
        createdSpaceKey: null,
      };
    default:
      return state;
  }
}

const initialState: WizardState = {
  step: STEP_FLOW[0],
  draft: getInitialDraft(),
  createdSpaceKey: null,
};

export default function CreateSpaceWizardPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepIndex = getStepIndex(state.step);
  const content = useMemo(() => STEP_CONTENT[state.step], [state.step]);
  const isFirstStep = stepIndex <= 0;
  const isLastStep = stepIndex === STEP_FLOW.length - 1;
  const isTemplateFlow =
    state.step === 'TEMPLATE_GALLERY' || state.step === 'TEMPLATE_DETAIL';
  const isManageTypeStep = state.step === 'MANAGE_TYPE';
  const isSpaceDetailsStep = state.step === 'SPACE_DETAILS';
  const isInviteStep = state.step === 'INVITE';

  const continueToBoard = () => {
    const resolvedKey =
      state.createdSpaceKey || state.draft.key || state.draft.name;
    if (!resolvedKey) {
      router.push('/');
      return;
    }

    router.push(`/boards/${encodeURIComponent(resolvedKey)}`);
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET_DRAFT' });
    router.push('/');
  };

  const handleBack = () => {
    if (isFirstStep) {
      handleCancel();
      return;
    }

    dispatch({ type: 'PREV_STEP' });
  };

  return (
    <Box className="create-space-wizard">
      <Box className="create-space-wizard__desktop">
        <Box className="create-space-wizard__header">
          <Button
            variant="text"
            className="create-space-wizard__back-btn"
            onClick={handleBack}
            startIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>

          <Typography className="create-space-wizard__header-title">
            Create space
          </Typography>

          <IconButton
            aria-label="Close wizard"
            className="create-space-wizard__close-btn"
            onClick={handleCancel}
          >
            <X size={16} />
          </IconButton>
        </Box>

        <Box className="create-space-wizard__progress">
          {STEP_FLOW.map((step, index) => (
            <Button
              key={step}
              variant="text"
              className={`create-space-wizard__progress-item ${
                index === stepIndex
                  ? 'create-space-wizard__progress-item--active'
                  : ''
              }`}
              onClick={() => dispatch({ type: 'GO_TO_STEP', payload: step })}
            >
              Step {index + 1}
            </Button>
          ))}
        </Box>

        <Box className="create-space-wizard__panel">
          {state.step === 'TEMPLATE_GALLERY' ? (
            <TemplateGalleryStep
              selectedTemplate={state.draft.template}
              onOpenTemplateDetail={(template) => {
                dispatch({
                  type: 'UPDATE_DRAFT',
                  payload: { template },
                });
                dispatch({ type: 'GO_TO_STEP', payload: 'TEMPLATE_DETAIL' });
              }}
            />
          ) : null}

          {state.step === 'TEMPLATE_DETAIL' ? (
            <TemplateDetailStep
              template={state.draft.template}
              onChangeTemplate={() =>
                dispatch({ type: 'GO_TO_STEP', payload: 'TEMPLATE_GALLERY' })
              }
              onUseTemplate={() =>
                dispatch({ type: 'GO_TO_STEP', payload: 'MANAGE_TYPE' })
              }
            />
          ) : null}

          {state.step === 'MANAGE_TYPE' ? (
            <ManageTypeStep
              selectedManageType={state.draft.manageType}
              onSelectAndContinue={(type) => {
                dispatch({
                  type: 'UPDATE_DRAFT',
                  payload: { manageType: type },
                });
                dispatch({ type: 'GO_TO_STEP', payload: 'SPACE_DETAILS' });
              }}
            />
          ) : null}

          {state.step === 'SPACE_DETAILS' ? (
            <SpaceDetailsStep
              draft={state.draft}
              onDraftChange={(value) =>
                dispatch({
                  type: 'UPDATE_DRAFT',
                  payload: value,
                })
              }
              onBack={() =>
                dispatch({
                  type: 'GO_TO_STEP',
                  payload: 'MANAGE_TYPE',
                })
              }
              onCreate={() => {
                const created = createMockSpaceFromDraft(state.draft);
                dispatch({
                  type: 'UPDATE_DRAFT',
                  payload: { key: created.key, name: created.name },
                });
                dispatch({
                  type: 'SET_CREATED_SPACE_KEY',
                  payload: created.key,
                });
                dispatch({
                  type: 'GO_TO_STEP',
                  payload: 'INVITE',
                });
              }}
            />
          ) : null}

          {state.step === 'INVITE' ? (
            <InviteMembersStep
              draft={state.draft}
              onDraftChange={(value) =>
                dispatch({
                  type: 'UPDATE_DRAFT',
                  payload: value,
                })
              }
              onSkip={continueToBoard}
              onInviteAndContinue={continueToBoard}
            />
          ) : null}

          {!isTemplateFlow &&
          !isManageTypeStep &&
          !isSpaceDetailsStep &&
          !isInviteStep ? (
            <>
              <Typography className="create-space-wizard__panel-title">
                {content.title}
              </Typography>
              <Typography className="create-space-wizard__panel-description">
                {content.description}
              </Typography>
            </>
          ) : null}
        </Box>

        {!isTemplateFlow &&
        !isManageTypeStep &&
        !isSpaceDetailsStep &&
        !isInviteStep ? (
          <Box className="create-space-wizard__footer">
            <Button
              variant="outlined"
              className="create-space-wizard__footer-btn"
              onClick={handleBack}
            >
              {isFirstStep ? 'Cancel' : 'Back'}
            </Button>

            <Button
              variant="contained"
              className="create-space-wizard__footer-btn"
              disabled={isLastStep}
              onClick={() => dispatch({ type: 'NEXT_STEP' })}
            >
              {isLastStep ? 'Done' : 'Next'}
            </Button>
          </Box>
        ) : null}
      </Box>

      <Box className="create-space-wizard__mobile">
        <Typography className="create-space-wizard__mobile-title">
          Desktop only
        </Typography>
        <Typography className="create-space-wizard__mobile-description">
          Space creation wizard is available on desktop in this phase.
        </Typography>
      </Box>
    </Box>
  );
}
