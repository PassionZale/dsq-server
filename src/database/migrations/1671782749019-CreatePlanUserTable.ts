import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanUserTable1671782749019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan_user', true);

    await queryRunner.createTable(
      new Table({
        name: 'plan_user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'plan_id',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan_user');
  }
}
