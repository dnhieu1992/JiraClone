import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateIssueDto } from './dto/create-issue.dto';
import { MoveIssueDto } from './dto/move-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssuesService } from './issues.service';

@Controller('spaces/:spaceId/issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  createIssue(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Body() dto: CreateIssueDto,
  ) {
    return this.issuesService.createIssue(this.getUserId(req), spaceId, dto);
  }

  @Get()
  listIssues(@Req() req: Request, @Param('spaceId') spaceId: string) {
    return this.issuesService.listIssues(this.getUserId(req), spaceId);
  }

  @Patch(':issueId')
  updateIssue(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Param('issueId') issueId: string,
    @Body() dto: UpdateIssueDto,
  ) {
    return this.issuesService.updateIssue(
      this.getUserId(req),
      spaceId,
      issueId,
      dto,
    );
  }

  @Delete(':issueId')
  deleteIssue(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Param('issueId') issueId: string,
  ) {
    return this.issuesService.deleteIssue(
      this.getUserId(req),
      spaceId,
      issueId,
    );
  }

  @Patch(':issueId/move')
  moveIssue(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Param('issueId') issueId: string,
    @Body() dto: MoveIssueDto,
  ) {
    return this.issuesService.moveIssue(
      this.getUserId(req),
      spaceId,
      issueId,
      dto,
    );
  }

  private getUserId(req: Request): string {
    const sub = (req as Request & { user?: { sub?: string } }).user?.sub;
    if (sub) {
      return sub;
    }

    const headerUserId = req.headers['x-user-id'];
    if (typeof headerUserId === 'string' && headerUserId.trim()) {
      return headerUserId;
    }

    return 'anonymous';
  }
}
