import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SpaceColumnEntity } from '../../spaces/entities/space-column.entity';
import { SpaceEntity } from '../../spaces/entities/space.entity';

export enum IssueType {
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
}

@Entity('issues')
export class IssueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  spaceId: string;

  @Column({ type: 'varchar', length: 36 })
  columnId: string;

  @Column({ type: 'enum', enum: IssueType })
  type: IssueType;

  @Column({ type: 'varchar', length: 240 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 64 })
  reporterId: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  assigneeId?: string | null;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => SpaceEntity, (space) => space.issues, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spaceId' })
  space: SpaceEntity;

  @ManyToOne(() => SpaceColumnEntity, (column) => column.issues, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'columnId' })
  column: SpaceColumnEntity;
}
