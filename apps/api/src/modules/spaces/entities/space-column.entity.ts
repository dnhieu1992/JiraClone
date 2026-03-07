import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IssueEntity } from '../../issues/entities/issue.entity';
import { SpaceEntity } from './space.entity';

@Entity('space_columns')
@Index('UQ_space_columns_space_name', ['spaceId', 'name'], { unique: true })
export class SpaceColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  spaceId: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  order: number;

  @Column({ type: 'boolean', default: false })
  isSystemDefault: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;

  @ManyToOne(() => SpaceEntity, (space) => space.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'spaceId' })
  space: SpaceEntity;

  @OneToMany(() => IssueEntity, (issue) => issue.column)
  issues: IssueEntity[];
}
