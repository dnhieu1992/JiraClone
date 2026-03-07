export type SpaceTemplate = 'KANBAN';

export type SpaceManageType = 'TEAM_MANAGED' | 'COMPANY_MANAGED';

export type WizardStep =
  | 'TEMPLATE_GALLERY'
  | 'TEMPLATE_DETAIL'
  | 'MANAGE_TYPE'
  | 'SPACE_DETAILS'
  | 'INVITE';

export type MockColumnKey = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface CreateSpaceDraft {
  template: SpaceTemplate;
  manageType: SpaceManageType | null;
  name: string;
  key: string;
  invites: string[];
}

export interface MockIssue {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  createdAt: string;
}

export interface MockColumn {
  id: string;
  key: MockColumnKey;
  name: string;
  order: number;
}

export interface MockBoard {
  id: string;
  spaceKey: string;
  selectedIssueId: string | null;
  columns: MockColumn[];
  issues: MockIssue[];
}

export interface MockSpace {
  id: string;
  key: string;
  name: string;
  template: SpaceTemplate;
  manageType: SpaceManageType;
  boardId: string;
  createdAt: string;
}
