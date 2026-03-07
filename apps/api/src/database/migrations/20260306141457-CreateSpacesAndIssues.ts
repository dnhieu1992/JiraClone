import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpacesAndIssues20260306141457 implements MigrationInterface {
  name = 'CreateSpacesAndIssues20260306141457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`spaces\` (
        \`id\` varchar(36) NOT NULL DEFAULT (uuid()),
        \`name\` varchar(120) NOT NULL,
        \`key\` varchar(24) NOT NULL,
        \`template\` enum ('KANBAN') NOT NULL,
        \`ownerId\` varchar(64) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`UQ_spaces_owner_key\` (\`ownerId\`, \`key\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`space_columns\` (
        \`id\` varchar(36) NOT NULL DEFAULT (uuid()),
        \`spaceId\` varchar(36) NOT NULL,
        \`name\` varchar(80) NOT NULL,
        \`order\` int UNSIGNED NOT NULL DEFAULT '0',
        \`isSystemDefault\` tinyint NOT NULL DEFAULT 0,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        UNIQUE INDEX \`UQ_space_columns_space_name\` (\`spaceId\`, \`name\`),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      CREATE TABLE \`issues\` (
        \`id\` varchar(36) NOT NULL DEFAULT (uuid()),
        \`spaceId\` varchar(36) NOT NULL,
        \`columnId\` varchar(36) NOT NULL,
        \`type\` enum ('EPIC', 'STORY', 'TASK', 'BUG') NOT NULL,
        \`title\` varchar(240) NOT NULL,
        \`description\` text NULL,
        \`reporterId\` varchar(64) NOT NULL,
        \`assigneeId\` varchar(64) NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB
    `);

    await queryRunner.query(`
      ALTER TABLE \`space_columns\`
      ADD CONSTRAINT \`FK_space_columns_space\`
      FOREIGN KEY (\`spaceId\`) REFERENCES \`spaces\`(\`id\`)
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`issues\`
      ADD CONSTRAINT \`FK_issues_space\`
      FOREIGN KEY (\`spaceId\`) REFERENCES \`spaces\`(\`id\`)
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE \`issues\`
      ADD CONSTRAINT \`FK_issues_column\`
      FOREIGN KEY (\`columnId\`) REFERENCES \`space_columns\`(\`id\`)
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`issues\`
      DROP FOREIGN KEY \`FK_issues_column\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`issues\`
      DROP FOREIGN KEY \`FK_issues_space\`
    `);
    await queryRunner.query(`
      ALTER TABLE \`space_columns\`
      DROP FOREIGN KEY \`FK_space_columns_space\`
    `);

    await queryRunner.query('DROP TABLE `issues`');
    await queryRunner.query(
      'DROP INDEX `UQ_space_columns_space_name` ON `space_columns`',
    );
    await queryRunner.query('DROP TABLE `space_columns`');
    await queryRunner.query('DROP INDEX `UQ_spaces_owner_key` ON `spaces`');
    await queryRunner.query('DROP TABLE `spaces`');
  }
}
