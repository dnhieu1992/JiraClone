import { getMetadataArgsStorage } from 'typeorm';
import { AppDataSource } from '../../../database/data-source';
import { IssueEntity } from '../../issues/entities/issue.entity';
import { SpaceColumnEntity } from './space-column.entity';
import { SpaceEntity } from './space.entity';

describe('Space domain entities metadata', () => {
  it('registers space, column, and issue tables', () => {
    expect(SpaceEntity).toBeDefined();
    expect(SpaceColumnEntity).toBeDefined();
    expect(IssueEntity).toBeDefined();

    const tables = getMetadataArgsStorage().tables.map((table) => table.name);

    expect(tables).toContain('spaces');
    expect(tables).toContain('space_columns');
    expect(tables).toContain('issues');
  });

  it('configures AppDataSource to load entity files', () => {
    const entitiesOption = AppDataSource.options.entities;

    expect(Array.isArray(entitiesOption)).toBe(true);
    expect((entitiesOption as string[]).length).toBeGreaterThan(0);
    expect((entitiesOption as string[])[0]).toContain('**/*.entity');
  });
});
