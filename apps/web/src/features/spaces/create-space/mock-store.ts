import {
  DEFAULT_CREATE_SPACE_DRAFT,
  DEFAULT_KANBAN_COLUMNS,
  DEFAULT_KANBAN_ISSUE_TITLES,
  SPACE_KEY_MAX_LENGTH,
} from './constants';
import type {
  CreateSpaceDraft,
  MockBoard,
  MockIssue,
  MockSpace,
} from './types';

type MockStoreState = {
  spaces: MockSpace[];
  boards: MockBoard[];
  seeded: boolean;
};

const state: MockStoreState = {
  spaces: [],
  boards: [],
  seeded: false,
};

function nowISO(): string {
  return new Date().toISOString();
}

function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createBoard(spaceId: string, spaceKey: string): MockBoard {
  const columns = DEFAULT_KANBAN_COLUMNS.map((column) => ({
    ...column,
    id: `${spaceId}-${column.id}`,
  }));

  const todoColumnId = columns[0].id;
  const issues: MockIssue[] = DEFAULT_KANBAN_ISSUE_TITLES.map(
    (title, index) => ({
      id: createId(`issue-${index}`),
      title,
      columnId: todoColumnId,
      createdAt: nowISO(),
    }),
  );

  return {
    id: createId('board'),
    spaceKey,
    selectedIssueId: issues[0]?.id ?? null,
    columns,
    issues,
  };
}

function createSpaceSeed(name: string, key: string): MockSpace {
  const id = createId('space');
  const board = createBoard(id, key);
  state.boards.push(board);

  return {
    id,
    key,
    name,
    template: 'KANBAN',
    manageType: 'TEAM_MANAGED',
    boardId: board.id,
    createdAt: nowISO(),
  };
}

export function normalizeSpaceKey(input: string): string {
  const normalized = input
    .trim()
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();

  return normalized.slice(0, SPACE_KEY_MAX_LENGTH);
}

export function ensureUniqueSpaceKey(candidate: string): string {
  const normalized = normalizeSpaceKey(candidate);
  const base = normalized.length > 0 ? normalized : 'SPACE';

  if (!state.spaces.some((space) => space.key === base)) {
    return base;
  }

  let index = 2;
  while (true) {
    const suffix = `-${index}`;
    const key = `${base.slice(0, SPACE_KEY_MAX_LENGTH - suffix.length)}${suffix}`;
    if (!state.spaces.some((space) => space.key === key)) {
      return key;
    }
    index += 1;
  }
}

export function seedDefaultData(): void {
  if (state.seeded) {
    return;
  }

  state.spaces = [
    createSpaceSeed('MVP', 'MVP'),
    createSpaceSeed('Website', 'WEBSITE'),
  ];
  state.seeded = true;
}

export function listRecentSpaces(): MockSpace[] {
  seedDefaultData();
  return [...state.spaces].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}

export function getBoardBySpaceKey(spaceKey: string): MockBoard | null {
  seedDefaultData();
  return state.boards.find((board) => board.spaceKey === spaceKey) ?? null;
}

export function getInitialDraft(): CreateSpaceDraft {
  return { ...DEFAULT_CREATE_SPACE_DRAFT };
}

export function createMockSpaceFromDraft(draft: CreateSpaceDraft): MockSpace {
  seedDefaultData();

  const resolvedName = draft.name.trim() || 'Untitled space';
  const resolvedKey = ensureUniqueSpaceKey(draft.key || resolvedName);
  const id = createId('space');
  const board = createBoard(id, resolvedKey);
  state.boards.push(board);

  const created: MockSpace = {
    id,
    key: resolvedKey,
    name: resolvedName,
    template: draft.template,
    manageType: draft.manageType ?? 'TEAM_MANAGED',
    boardId: board.id,
    createdAt: nowISO(),
  };

  state.spaces.unshift(created);
  return created;
}

export function resetMockStore(): void {
  state.spaces = [];
  state.boards = [];
  state.seeded = false;
}
