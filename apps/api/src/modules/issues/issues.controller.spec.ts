import { Request } from 'express';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

type AuthRequest = Request & { user?: { sub?: string } };

function createRequest(options: {
  userSub?: string;
  headerUserId?: string;
}): AuthRequest {
  return {
    user: options.userSub ? { sub: options.userSub } : undefined,
    headers: options.headerUserId ? { 'x-user-id': options.headerUserId } : {},
  } as AuthRequest;
}

describe('IssuesController', () => {
  let controller: IssuesController;
  let service: jest.Mocked<IssuesService>;

  beforeEach(() => {
    service = {
      createIssue: jest.fn(),
      listIssues: jest.fn(),
      updateIssue: jest.fn(),
      deleteIssue: jest.fn(),
      moveIssue: jest.fn(),
    } as unknown as jest.Mocked<IssuesService>;

    controller = new IssuesController(service);
  });

  it('uses req.user.sub when creating issue', async () => {
    service.createIssue.mockResolvedValue({ id: 'iss-1' } as never);

    await controller.createIssue(
      createRequest({ userSub: 'user-sub' }),
      'space-1',
      {
        type: 'TASK' as never,
        title: 'Title',
        columnId: 'col-1',
      },
    );

    expect(service.createIssue.mock.calls[0]).toEqual([
      'user-sub',
      'space-1',
      {
        type: 'TASK',
        title: 'Title',
        columnId: 'col-1',
      },
    ]);
  });

  it('falls back to x-user-id header when listing issues', async () => {
    service.listIssues.mockResolvedValue([] as never);

    await controller.listIssues(
      createRequest({ headerUserId: 'header-user' }),
      'space-1',
    );

    expect(service.listIssues.mock.calls[0]).toEqual([
      'header-user',
      'space-1',
    ]);
  });

  it('falls back to anonymous when moving issue without identity', async () => {
    service.moveIssue.mockResolvedValue({ id: 'iss-1' } as never);

    await controller.moveIssue(createRequest({}), 'space-1', 'iss-1', {
      sourceColumnId: 'col-1',
      targetColumnId: 'col-2',
    });

    expect(service.moveIssue.mock.calls[0]).toEqual([
      'anonymous',
      'space-1',
      'iss-1',
      {
        sourceColumnId: 'col-1',
        targetColumnId: 'col-2',
      },
    ]);
  });
});
