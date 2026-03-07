import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueEntity } from '../../issues/entities/issue.entity';
import { SpaceColumnEntity } from './space-column.entity';

export enum SpaceTemplate {
  KANBAN = 'KANBAN',
}

@Entity('spaces')
@Index('UQ_spaces_owner_key', ['ownerId', 'key'], { unique: true })
export class SpaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 24 })
  key: string;

  @Column({ type: 'enum', enum: SpaceTemplate })
  template: SpaceTemplate;

  @Column({ type: 'varchar', length: 64 })
  ownerId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => SpaceColumnEntity, (column) => column.space)
  columns: SpaceColumnEntity[];

  @OneToMany(() => IssueEntity, (issue) => issue.space)
  issues: IssueEntity[];
}
