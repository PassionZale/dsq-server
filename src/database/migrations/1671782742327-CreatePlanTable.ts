import { PlanStatus } from '@/common/enums/plan-status.enum';
import { PlanLevel } from '@/common/enums/plan-level.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanTable1671782742327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan', true);

    await queryRunner.createTable(
      new Table({
        name: 'plan',
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
            comment: '迭代名称',
          },
          {
            name: 'desc',
            type: 'text',
            comment: '迭代说明',
          },
          {
            name: 'doc',
            type: 'text',
            comment: '迭代文档',
          },
          {
            name: 'level',
            type: 'enum',
            enum: [
              PlanLevel.URGENT,
              PlanLevel.HIGH,
              PlanLevel.MIDDLE,
              PlanLevel.LOW,
            ],
            default: `'${PlanLevel.LOW}'`,
            comment: '优先级',
          },
          {
            name: 'status',
            type: 'enum',
            enum: [
              PlanStatus.NOT_START,
              PlanStatus.REVIWEING,
              PlanStatus.DEVELOPING,
              PlanStatus.TESTING,
              PlanStatus.RELEASED,
            ],
            default: `'${PlanStatus.NOT_START}'`,
            comment: '状态',
          },
          {
            name: 'review_at',
            type: 'datetime',
            isNullable: true,
            comment: '终审时间',
          },
          {
            name: 'test_at',
            type: 'datetime',
            isNullable: true,
            comment: '提测时间',
          },
          {
            name: 'release_at',
            type: 'datetime',
            isNullable: true,
            comment: '上线时间',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plan');
  }
}
