import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpaceColumnEntity } from '../spaces/entities/space-column.entity';
import { SpaceEntity } from '../spaces/entities/space.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { MoveIssueDto } from './dto/move-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueEntity } from './entities/issue.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spacesRepo: Repository<SpaceEntity>,
    @InjectRepository(SpaceColumnEntity)
    private readonly columnsRepo: Repository<SpaceColumnEntity>,
    @InjectRepository(IssueEntity)
    private readonly issuesRepo: Repository<IssueEntity>,
  ) {}

  async createIssue(ownerId: string, spaceId: string, dto: CreateIssueDto) {
    await this.ensureSpaceAccess(ownerId, spaceId);

    const column = await this.columnsRepo.findOne({
      where: { id: dto.columnId, spaceId },
    });

    if (!column) {
      throw new BadRequestException('Column does not belong to space');
    }

    const created = this.issuesRepo.create({
      ...dto,
      spaceId,
      reporterId: ownerId,
    });

    return this.issuesRepo.save(created);
  }

  async listIssues(ownerId: string, spaceId: string) {
    await this.ensureSpaceAccess(ownerId, spaceId);

    return this.issuesRepo.find({
      where: { spaceId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateIssue(
    ownerId: string,
    spaceId: string,
    issueId: string,
    dto: UpdateIssueDto,
  ) {
    await this.ensureSpaceAccess(ownerId, spaceId);
    await this.ensureIssueExists(spaceId, issueId);

    await this.issuesRepo.update({ id: issueId, spaceId }, dto);
    return this.issuesRepo.findOne({ where: { id: issueId, spaceId } });
  }

  async deleteIssue(ownerId: string, spaceId: string, issueId: string) {
    await this.ensureSpaceAccess(ownerId, spaceId);
    await this.ensureIssueExists(spaceId, issueId);

    await this.issuesRepo.delete({ id: issueId, spaceId });
    return { id: issueId };
  }

  async moveIssue(
    ownerId: string,
    spaceId: string,
    issueId: string,
    dto: MoveIssueDto,
  ) {
    await this.ensureSpaceAccess(ownerId, spaceId);
    await this.ensureIssueExists(spaceId, issueId);

    const source = await this.columnsRepo.findOne({
      where: { id: dto.sourceColumnId, spaceId },
    });
    if (!source) {
      throw new BadRequestException('Source column does not belong to space');
    }

    const target = await this.columnsRepo.findOne({
      where: { id: dto.targetColumnId, spaceId },
    });
    if (!target) {
      throw new BadRequestException('Target column does not belong to space');
    }

    await this.issuesRepo.update(
      { id: issueId, spaceId, columnId: dto.sourceColumnId },
      { columnId: dto.targetColumnId },
    );

    return this.issuesRepo.findOne({ where: { id: issueId, spaceId } });
  }

  private async ensureSpaceAccess(ownerId: string, spaceId: string) {
    const space = await this.spacesRepo.findOne({
      where: { id: spaceId, ownerId },
    });

    if (!space) {
      throw new NotFoundException('Space not found');
    }

    return space;
  }

  private async ensureIssueExists(spaceId: string, issueId: string) {
    const issue = await this.issuesRepo.findOne({
      where: { id: issueId, spaceId },
    });

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }
}
