import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from '../issues/entities/issue.entity';
import { SpaceColumnEntity } from './entities/space-column.entity';
import { SpaceEntity } from './entities/space.entity';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceEntity, SpaceColumnEntity, IssueEntity]),
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
  exports: [SpacesService],
})
export class SpacesModule {}
