import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceColumnEntity } from '../spaces/entities/space-column.entity';
import { SpaceEntity } from '../spaces/entities/space.entity';
import { IssueEntity } from './entities/issue.entity';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SpaceEntity, SpaceColumnEntity, IssueEntity]),
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {}
