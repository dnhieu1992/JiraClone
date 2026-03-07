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
import { CreateColumnDto } from './dto/create-column.dto';
import { CreateSpaceDto } from './dto/create-space.dto';
import { DeleteColumnDto } from './dto/delete-column.dto';
import { ReorderColumnsDto } from './dto/reorder-columns.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { SpacesService } from './spaces.service';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  createSpace(@Req() req: Request, @Body() dto: CreateSpaceDto) {
    return this.spacesService.createSpace(this.getUserId(req), dto);
  }

  @Get()
  listSpaces(@Req() req: Request) {
    return this.spacesService.listSpaces(this.getUserId(req));
  }

  @Get(':spaceId')
  getSpace(@Req() req: Request, @Param('spaceId') spaceId: string) {
    return this.spacesService.getSpace(this.getUserId(req), spaceId);
  }

  @Get(':spaceId/columns')
  listColumns(@Req() req: Request, @Param('spaceId') spaceId: string) {
    return this.spacesService.listColumns(this.getUserId(req), spaceId);
  }

  @Patch(':spaceId')
  updateSpace(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Body() dto: UpdateSpaceDto,
  ) {
    return this.spacesService.updateSpace(this.getUserId(req), spaceId, dto);
  }

  @Post(':spaceId/columns')
  createColumn(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Body() dto: CreateColumnDto,
  ) {
    return this.spacesService.createColumn(this.getUserId(req), spaceId, dto);
  }

  @Patch(':spaceId/columns/reorder')
  reorderColumns(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Body() dto: ReorderColumnsDto,
  ) {
    return this.spacesService.reorderColumns(this.getUserId(req), spaceId, dto);
  }

  @Patch(':spaceId/columns/:columnId')
  updateColumn(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Param('columnId') columnId: string,
    @Body() dto: UpdateColumnDto,
  ) {
    return this.spacesService.updateColumn(
      this.getUserId(req),
      spaceId,
      columnId,
      dto,
    );
  }

  @Delete(':spaceId/columns/:columnId')
  deleteColumn(
    @Req() req: Request,
    @Param('spaceId') spaceId: string,
    @Param('columnId') columnId: string,
    @Body() dto: DeleteColumnDto,
  ) {
    return this.spacesService.deleteColumn(
      this.getUserId(req),
      spaceId,
      columnId,
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
