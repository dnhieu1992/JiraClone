import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { IssueEntity } from '../issues/entities/issue.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';
import { ReorderColumnsDto } from './dto/reorder-columns.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { SpaceColumnEntity } from './entities/space-column.entity';
import { SpaceEntity } from './entities/space.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spacesRepo: Repository<SpaceEntity>,
    @InjectRepository(SpaceColumnEntity)
    private readonly columnsRepo: Repository<SpaceColumnEntity>,
    @InjectRepository(IssueEntity)
    private readonly issuesRepo: Repository<IssueEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createSpace(ownerId: string, dto: CreateSpaceDto) {
    const normalizedKey = this.normalizeKey(dto.key ?? dto.name);

    return this.dataSource.transaction(async (manager) => {
      const spaceRepository = manager.getRepository(SpaceEntity);
      const columnRepository = manager.getRepository(SpaceColumnEntity);

      const createdSpace = await spaceRepository.save(
        spaceRepository.create({
          name: dto.name,
          key: normalizedKey,
          ownerId,
          template: dto.template,
        }),
      );

      const columns = columnRepository.create([
        {
          spaceId: createdSpace.id,
          name: 'Todo',
          order: 0,
          isSystemDefault: true,
        },
        {
          spaceId: createdSpace.id,
          name: 'In Progress',
          order: 1,
          isSystemDefault: true,
        },
        {
          spaceId: createdSpace.id,
          name: 'Done',
          order: 2,
          isSystemDefault: true,
        },
      ]);

      await columnRepository.save(columns);

      return createdSpace;
    });
  }

  async listSpaces(ownerId: string) {
    return this.spacesRepo.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async getSpace(ownerId: string, spaceId: string) {
    const space = await this.spacesRepo.findOne({
      where: { id: spaceId, ownerId },
    });

    if (!space) {
      throw new NotFoundException('Space not found');
    }

    return space;
  }

  async listColumns(ownerId: string, spaceId: string) {
    await this.getSpace(ownerId, spaceId);

    return this.columnsRepo.find({
      where: { spaceId },
      order: { order: 'ASC' },
    });
  }

  async updateSpace(ownerId: string, spaceId: string, dto: UpdateSpaceDto) {
    await this.getSpace(ownerId, spaceId);
    await this.spacesRepo.update({ id: spaceId, ownerId }, dto);
    return this.getSpace(ownerId, spaceId);
  }

  async createColumn(ownerId: string, spaceId: string, dto: CreateColumnDto) {
    await this.getSpace(ownerId, spaceId);

    const currentCount = await this.columnsRepo.countBy({ spaceId });
    const created = this.columnsRepo.create({
      spaceId,
      name: dto.name,
      order: dto.order ?? currentCount,
      isSystemDefault: false,
    });

    return this.columnsRepo.save(created);
  }

  async updateColumn(
    ownerId: string,
    spaceId: string,
    columnId: string,
    dto: UpdateColumnDto,
  ) {
    await this.getSpace(ownerId, spaceId);

    const found = await this.columnsRepo.findOne({
      where: { id: columnId, spaceId },
    });
    if (!found) {
      throw new NotFoundException('Column not found');
    }

    await this.columnsRepo.update({ id: columnId, spaceId }, dto);
    return this.columnsRepo.findOne({ where: { id: columnId, spaceId } });
  }

  async deleteColumn(
    ownerId: string,
    spaceId: string,
    columnId: string,
    dto?: DeleteColumnDto,
  ) {
    await this.getSpace(ownerId, spaceId);

    const target = await this.columnsRepo.findOne({
      where: { id: columnId, spaceId },
    });
    if (!target) {
      throw new NotFoundException('Column not found');
    }

    const totalColumns = await this.columnsRepo.countBy({ spaceId });
    if (totalColumns <= 1) {
      throw new BadRequestException('Cannot delete the last remaining column');
    }

    const issuesInColumn = await this.issuesRepo.countBy({ spaceId, columnId });
    if (issuesInColumn > 0 && !dto?.moveIssuesToColumnId) {
      throw new BadRequestException('moveIssuesToColumnId is required');
    }

    if (issuesInColumn > 0 && dto?.moveIssuesToColumnId) {
      await this.issuesRepo.update(
        { spaceId, columnId },
        { columnId: dto.moveIssuesToColumnId },
      );
    }

    await this.columnsRepo.delete({ id: columnId, spaceId });
    return { id: columnId };
  }

  async reorderColumns(
    ownerId: string,
    spaceId: string,
    dto: ReorderColumnsDto,
  ) {
    await this.getSpace(ownerId, spaceId);

    const columns = await this.columnsRepo.findBy({
      id: In(dto.columnIds),
      spaceId,
    });

    if (columns.length !== dto.columnIds.length) {
      throw new BadRequestException('Invalid columnIds payload');
    }

    await Promise.all(
      dto.columnIds.map((columnId, index) =>
        this.columnsRepo.update({ id: columnId, spaceId }, { order: index }),
      ),
    );

    return this.columnsRepo.find({
      where: { spaceId },
      order: { order: 'ASC' },
    });
  }

  private normalizeKey(value: string): string {
    return value
      .trim()
      .replace(/[^A-Za-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 24)
      .toUpperCase();
  }
}
