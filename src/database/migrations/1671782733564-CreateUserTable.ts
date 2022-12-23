import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '@/common/enum/user-role.enum';
import { UserStatus } from '@/common/enum/user-status.enum';

export class CreateUserTable1671782733564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'avatar',
            type: 'varchar',
            default: `'media/icons/avatar.jpg'`,
            comment: '头像',
          },
          {
            name: 'fullname',
            type: 'varchar',
            length: '20',
            comment: '姓名',
          },
          {
            name: 'job_number',
            type: 'int',
            isUnique: true,
            comment: '工号',
          },
          {
            name: 'hashed_password',
            type: 'varchar',
            comment: '密码',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'int',
            default: `'${UserRole.STAFF}'`,
            comment: '角色',
          },
          {
            name: 'status',
            type: 'enum',
            enum: [
              UserStatus.ACTIVED,
              UserStatus.FORZEN,
              UserStatus.INACTIVATED,
              UserStatus.LOSED,
            ],
            default: `'${UserStatus.ACTIVED}'`,
            comment: '用户状态',
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
    await queryRunner.dropTable('user');
  }
}
