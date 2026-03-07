import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SpaceColumnEntity } from '../spaces/entities/space-column.entity';
import { SpaceEntity } from '../spaces/entities/space.entity';
import { IssueEntity, IssueType } from './entities/issue.entity';
import { IssuesService } from './issues.service';

type MockRepo = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};

function createRepoMock(): MockRepo {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('IssuesService', () => {
  let service: IssuesService;
  let spacesRepo: MockRepo;
  let columnsRepo: MockRepo;
  let issuesRepo: MockRepo;

  beforeEach(async () => {
    spacesRepo = createRepoMock();
    columnsRepo = createRepoMock();
    issuesRepo = createRepoMock();

    const moduleRef = await Test.createTestingModule({
      providers: [
        IssuesService,
        { provide: getRepositoryToken(SpaceEntity), useValue: spacesRepo },
        {
          provide: getRepositoryToken(SpaceColumnEntity),
          useValue: columnsRepo,
        },
        { provide: getRepositoryToken(IssueEntity), useValue: issuesRepo },
      ],
    }).compile();

    service = moduleRef.get(IssuesService);
  });

  it('creates issue when space and column are valid', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    columnsRepo.findOne.mockResolvedValue({ id: 'col-1', spaceId: 'space-1' });
    issuesRepo.create.mockImplementation(
      (value: Record<string, unknown>) => value,
    );
    issuesRepo.save.mockResolvedValue({ id: 'iss-1' });

    await service.createIssue('user-1', 'space-1', {
      type: IssueType.TASK,
      title: 'Implement auth',
      description: 'Setup keycloak flow',
      columnId: 'col-1',
      assigneeId: 'user-2',
    });

    expect(issuesRepo.create).toHaveBeenCalledWith({
      spaceId: 'space-1',
      type: IssueType.TASK,
      title: 'Implement auth',
      description: 'Setup keycloak flow',
      columnId: 'col-1',
      assigneeId: 'user-2',
      reporterId: 'user-1',
    });
    expect(issuesRepo.save).toHaveBeenCalledTimes(1);
  });

  it('lists issues by space only', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    issuesRepo.find.mockResolvedValue([{ id: 'iss-1' }]);

    await service.listIssues('user-1', 'space-1');

    expect(issuesRepo.find).toHaveBeenCalledWith({
      where: { spaceId: 'space-1' },
      order: { createdAt: 'DESC' },
    });
  });

  it('updates issue in owner scope', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    issuesRepo.findOne.mockResolvedValue({ id: 'iss-1', spaceId: 'space-1' });
    issuesRepo.update.mockResolvedValue({ affected: 1 });

    await service.updateIssue('user-1', 'space-1', 'iss-1', {
      title: 'New title',
    });

    expect(issuesRepo.update).toHaveBeenCalledWith(
      { id: 'iss-1', spaceId: 'space-1' },
      { title: 'New title' },
    );
  });

  it('moves issue to another column in same space', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    issuesRepo.findOne.mockResolvedValue({ id: 'iss-1', spaceId: 'space-1' });
    columnsRepo.findOne
      .mockResolvedValueOnce({ id: 'col-1', spaceId: 'space-1' })
      .mockResolvedValueOnce({ id: 'col-2', spaceId: 'space-1' });

    await service.moveIssue('user-1', 'space-1', 'iss-1', {
      sourceColumnId: 'col-1',
      targetColumnId: 'col-2',
    });

    expect(issuesRepo.update).toHaveBeenCalledWith(
      { id: 'iss-1', spaceId: 'space-1', columnId: 'col-1' },
      { columnId: 'col-2' },
    );
  });

  it('rejects move when target column is not in space', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    issuesRepo.findOne.mockResolvedValue({ id: 'iss-1', spaceId: 'space-1' });
    columnsRepo.findOne
      .mockResolvedValueOnce({ id: 'col-1', spaceId: 'space-1' })
      .mockResolvedValueOnce(null);

    await expect(
      service.moveIssue('user-1', 'space-1', 'iss-1', {
        sourceColumnId: 'col-1',
        targetColumnId: 'col-2',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws when issue does not exist in space', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    issuesRepo.findOne.mockResolvedValue(null);

    await expect(
      service.deleteIssue('user-1', 'space-1', 'iss-1'),
    ).rejects.toThrow(NotFoundException);
  });
});
