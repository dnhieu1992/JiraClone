import type { CreateSpaceDraft, MockColumn, SpaceTemplate } from './types';

export const DEFAULT_SPACE_TEMPLATE: SpaceTemplate = 'KANBAN';

export const DEFAULT_CREATE_SPACE_DRAFT: CreateSpaceDraft = {
  template: DEFAULT_SPACE_TEMPLATE,
  manageType: null,
  name: '',
  key: '',
  invites: [],
};

export const DEFAULT_KANBAN_COLUMNS: ReadonlyArray<MockColumn> = [
  {
    id: 'todo',
    key: 'TODO',
    name: 'TO DO',
    order: 0,
  },
  {
    id: 'in-progress',
    key: 'IN_PROGRESS',
    name: 'IN PROGRESS',
    order: 1,
  },
  {
    id: 'done',
    key: 'DONE',
    name: 'DONE',
    order: 2,
  },
];

export const DEFAULT_KANBAN_ISSUE_TITLES: ReadonlyArray<string> = [
  'What needs to be done?',
  'Prepare board kickoff checklist',
  'Define acceptance criteria',
];

export const SPACE_KEY_MAX_LENGTH = 24;
