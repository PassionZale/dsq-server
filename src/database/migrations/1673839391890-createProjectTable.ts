import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProjectTable1673839391890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project', true);

    await queryRunner.createTable(
      new Table({
        name: 'project',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '20',
            comment: '项目名称',
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
            comment: '项目 logo',
          },
          {
            name: 'desc',
            type: 'text',
            isNullable: true,
            comment: '项目说明',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            comment: '创建时间',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
            comment: '更新时间',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project');
  }
}
