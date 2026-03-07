'use client';

import { useMemo, useState } from 'react';
import { Box, Typography } from '@/components/ui';
import { getBoardBySpaceKey } from '@/features/spaces/create-space/mock-store';
import type {
  MockColumn,
  MockIssue,
} from '@/features/spaces/create-space/types';
import './kanban-board.scss';

type KanbanBoardProps = {
  boardId: string;
};

function getFirstTodoIssueId(
  columns: MockColumn[],
  issues: MockIssue[],
): string | null {
  const todoColumn = columns.find((column) => column.key === 'TODO');
  if (!todoColumn) {
    return null;
  }

  return issues.find((issue) => issue.columnId === todoColumn.id)?.id ?? null;
}

export default function KanbanBoard({ boardId }: KanbanBoardProps) {
  const board = useMemo(() => getBoardBySpaceKey(boardId), [boardId]);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(() => {
    if (!board) {
      return null;
    }

    return (
      board.selectedIssueId ?? getFirstTodoIssueId(board.columns, board.issues)
    );
  });

  if (!board) {
    return (
      <Box className="kanban-board-empty">
        <Typography className="kanban-board-empty__title">
          Board not found
        </Typography>
        <Typography className="kanban-board-empty__description">
          Create a new space from the sidebar to generate a board.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="kanban-board">
      {board.columns
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((column) => {
          const columnIssues = board.issues.filter(
            (issue) => issue.columnId === column.id,
          );

          return (
            <Box key={column.id} className="kanban-board__column">
              <Box className="kanban-board__column-header">
                <Typography className="kanban-board__column-title">
                  {column.name}
                </Typography>
                <Typography className="kanban-board__column-count">
                  {columnIssues.length}
                </Typography>
              </Box>

              <Box className="kanban-board__column-body">
                {columnIssues.length === 0 ? (
                  <Box className="kanban-board__empty-card">
                    <Typography className="kanban-board__empty-card-label">
                      No issues
                    </Typography>
                  </Box>
                ) : null}

                {columnIssues.map((issue) => (
                  <button
                    key={issue.id}
                    type="button"
                    className={`kanban-board__card ${
                      selectedIssueId === issue.id
                        ? 'kanban-board__card--selected'
                        : ''
                    }`}
                    onClick={() => setSelectedIssueId(issue.id)}
                  >
                    <Typography className="kanban-board__card-title">
                      {issue.title}
                    </Typography>
                  </button>
                ))}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
}
