import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { IssuesController } from '../src/modules/issues/issues.controller';
import { IssuesService } from '../src/modules/issues/issues.service';
import { SpacesController } from '../src/modules/spaces/spaces.controller';
import { SpacesService } from '../src/modules/spaces/spaces.service';

type AuthRequest = Request & { user?: { sub?: string } };

function createRequest(userId: string): AuthRequest {
  return { headers: { 'x-user-id': userId } } as unknown as AuthRequest;
}

describe('Spaces & Issues module integration (e2e)', () => {
  let app: INestApplication;
  let spacesController: SpacesController;
  let issuesController: IssuesController;
  let spacesService: jest.Mocked<SpacesService>;
  let issuesService: jest.Mocked<IssuesService>;

  beforeEach(async () => {
    spacesService = {
      createSpace: jest.fn().mockResolvedValue({ id: 'space-1' } as never),
      listSpaces: jest.fn().mockResolvedValue([{ id: 'space-1' }] as never),
      getSpace: jest.fn().mockResolvedValue({ id: 'space-1' } as never),
      listColumns: jest
        .fn()
        .mockResolvedValue([{ id: 'col-1', order: 0 }] as never),
      updateSpace: jest.fn().mockResolvedValue({ id: 'space-1' } as never),
      createColumn: jest.fn().mockResolvedValue({ id: 'col-1' } as never),
      reorderColumns: jest
        .fn()
        .mockResolvedValue([{ id: 'col-1', order: 0 }] as never),
      updateColumn: jest.fn().mockResolvedValue({ id: 'col-1' } as never),
      deleteColumn: jest.fn().mockResolvedValue({ id: 'col-1' } as never),
    } as unknown as jest.Mocked<SpacesService>;

    issuesService = {
      createIssue: jest.fn().mockResolvedValue({ id: 'iss-1' } as never),
      listIssues: jest.fn().mockResolvedValue([{ id: 'iss-1' }] as never),
      updateIssue: jest.fn().mockResolvedValue({ id: 'iss-1' } as never),
      deleteIssue: jest.fn().mockResolvedValue({ id: 'iss-1' } as never),
      moveIssue: jest.fn().mockResolvedValue({ id: 'iss-1' } as never),
    } as unknown as jest.Mocked<IssuesService>;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SpacesController, IssuesController],
      providers: [
        { provide: SpacesService, useValue: spacesService },
        { provide: IssuesService, useValue: issuesService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    spacesController = app.get(SpacesController);
    issuesController = app.get(IssuesController);
  });

  afterEach(async () => {
    await app.close();
  });

  it('lists columns via spaces controller + service wiring', async () => {
    const req = createRequest('user-1');

    const result = await spacesController.listColumns(req, 'space-1');

    expect(result).toEqual([{ id: 'col-1', order: 0 }]);
    expect(spacesService.listColumns).toHaveBeenCalledWith('user-1', 'space-1');
  });

  it('creates issue via issues controller + service wiring', async () => {
    const req = createRequest('user-1');
    const payload = {
      type: 'TASK' as never,
      title: 'Implement tests',
      columnId: 'col-1',
    };

    const result = await issuesController.createIssue(req, 'space-1', payload);

    expect(result).toEqual({ id: 'iss-1' });
    expect(issuesService.createIssue).toHaveBeenCalledWith(
      'user-1',
      'space-1',
      {
        type: 'TASK',
        title: 'Implement tests',
        columnId: 'col-1',
      },
    );
  });

  it('moves issue via issues controller + service wiring', async () => {
    const req = createRequest('user-1');
    const payload = {
      sourceColumnId: 'col-1',
      targetColumnId: 'col-2',
    };

    const result = await issuesController.moveIssue(
      req,
      'space-1',
      'iss-1',
      payload,
    );

    expect(result).toEqual({ id: 'iss-1' });
    expect(issuesService.moveIssue).toHaveBeenCalledWith(
      'user-1',
      'space-1',
      'iss-1',
      payload,
    );
  });
});
