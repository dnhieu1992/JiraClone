import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IssueEntity } from '../issues/entities/issue.entity';
import { SpaceColumnEntity } from './entities/space-column.entity';
import { SpaceEntity, SpaceTemplate } from './entities/space.entity';
import { SpacesService } from './spaces.service';

type MockRepo = {
  create: jest.Mock;
  save: jest.Mock;
  find: jest.Mock;
  findOne: jest.Mock;
  findBy: jest.Mock;
  countBy: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
};
type TransactionManager = {
  getRepository: (entity: unknown) => MockRepo;
};

function createRepoMock(): MockRepo {
  return {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
    countBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('SpacesService', () => {
  let service: SpacesService;
  let spacesRepo: MockRepo;
  let columnsRepo: MockRepo;
  let issuesRepo: MockRepo;
  let dataSource: { transaction: jest.Mock };

  beforeEach(async () => {
    spacesRepo = createRepoMock();
    columnsRepo = createRepoMock();
    issuesRepo = createRepoMock();
    dataSource = {
      transaction: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SpacesService,
        { provide: getRepositoryToken(SpaceEntity), useValue: spacesRepo },
        {
          provide: getRepositoryToken(SpaceColumnEntity),
          useValue: columnsRepo,
        },
        { provide: getRepositoryToken(IssueEntity), useValue: issuesRepo },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = moduleRef.get(SpacesService);
  });

  it('creates a kanban space and seeds default columns', async () => {
    spacesRepo.create.mockImplementation(
      (value: Record<string, unknown>) => value,
    );
    spacesRepo.save.mockResolvedValue({
      id: 'space-1',
      name: 'MVP',
      key: 'MVP',
      ownerId: 'user-1',
      template: SpaceTemplate.KANBAN,
    });
    columnsRepo.create.mockImplementation(
      (value: Array<Record<string, unknown>>) => value,
    );
    dataSource.transaction.mockImplementation(
      (cb: (manager: TransactionManager) => Promise<unknown>) =>
        cb({
          getRepository: (entity: unknown) => {
            if (entity === SpaceEntity) {
              return spacesRepo;
            }

            return columnsRepo;
          },
        }),
    );

    await service.createSpace('user-1', {
      name: 'MVP',
      template: SpaceTemplate.KANBAN,
    });

    expect(dataSource.transaction).toHaveBeenCalledTimes(1);
    expect(spacesRepo.create).toHaveBeenCalledWith({
      name: 'MVP',
      key: 'MVP',
      ownerId: 'user-1',
      template: SpaceTemplate.KANBAN,
    });
    expect(columnsRepo.create).toHaveBeenCalledWith([
      {
        spaceId: 'space-1',
        name: 'Todo',
        order: 0,
        isSystemDefault: true,
      },
      {
        spaceId: 'space-1',
        name: 'In Progress',
        order: 1,
        isSystemDefault: true,
      },
      {
        spaceId: 'space-1',
        name: 'Done',
        order: 2,
        isSystemDefault: true,
      },
    ]);
  });

  it('requires moveIssuesToColumnId when deleting a non-empty column', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    columnsRepo.findOne.mockResolvedValue({
      id: 'col-1',
      spaceId: 'space-1',
      name: 'Todo',
    });
    columnsRepo.countBy.mockResolvedValue(3);
    issuesRepo.countBy.mockResolvedValue(2);

    await expect(
      service.deleteColumn('user-1', 'space-1', 'col-1'),
    ).rejects.toThrow(BadRequestException);
  });

  it('rejects deleting the last remaining column', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    columnsRepo.findOne.mockResolvedValue({
      id: 'col-1',
      spaceId: 'space-1',
      name: 'Todo',
    });
    columnsRepo.countBy.mockResolvedValue(1);

    await expect(
      service.deleteColumn('user-1', 'space-1', 'col-1'),
    ).rejects.toThrow(BadRequestException);
  });

  it('reorders columns by updating order index', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    columnsRepo.findBy.mockResolvedValue([
      { id: 'col-1', spaceId: 'space-1' },
      { id: 'col-2', spaceId: 'space-1' },
      { id: 'col-3', spaceId: 'space-1' },
    ]);
    columnsRepo.update.mockResolvedValue({ affected: 1 });

    await service.reorderColumns('user-1', 'space-1', {
      columnIds: ['col-3', 'col-1', 'col-2'],
    });

    expect(columnsRepo.update).toHaveBeenNthCalledWith(
      1,
      { id: 'col-3', spaceId: 'space-1' },
      { order: 0 },
    );
    expect(columnsRepo.update).toHaveBeenNthCalledWith(
      2,
      { id: 'col-1', spaceId: 'space-1' },
      { order: 1 },
    );
    expect(columnsRepo.update).toHaveBeenNthCalledWith(
      3,
      { id: 'col-2', spaceId: 'space-1' },
      { order: 2 },
    );
  });

  it('lists columns by ascending order in owner scope', async () => {
    spacesRepo.findOne.mockResolvedValue({ id: 'space-1', ownerId: 'user-1' });
    columnsRepo.find.mockResolvedValue([
      { id: 'col-1', order: 0 },
      { id: 'col-2', order: 1 },
    ]);

    await service.listColumns('user-1', 'space-1');

    expect(columnsRepo.find).toHaveBeenCalledWith({
      where: { spaceId: 'space-1' },
      order: { order: 'ASC' },
    });
  });

  it('throws not found when space is outside owner scope', async () => {
    spacesRepo.findOne.mockResolvedValue(null);

    await expect(service.getSpace('user-1', 'space-1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
