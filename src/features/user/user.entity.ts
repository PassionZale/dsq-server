import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@/common/enums/user-role.enum';
import { UserStatus } from '@/common/enums/user-status.enum';
import { MediaPathTransformer } from '@/database/database.transformer';
import { UserType } from '@/common/enums/user-type.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 头像
  @Column('varchar', {
    nullable: true,
    transformer: new MediaPathTransformer(),
  })
  avatar: string;

  // 姓名：真实姓名
  @Column('varchar', { length: 20 })
  fullname: string;

  // 工号：登录账号
  @Column('int', { unique: true })
  job_number: number;

  // 密码：登录密码
  @Column('varchar', { select: false, nullable: true })
  hashed_password?: string;

  // 角色
  @Column('enum', {
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role: UserRole;

  // 状态
  @Column('enum', {
    enum: UserStatus,
    default: UserStatus.INACTIVATED,
  })
  status: UserStatus;

  // 用户类型
  @Column('enum', {
    enum: UserType,
    default: UserType.NONE,
  })
  type: UserType;

  // 推荐码(用于激活并初始化密码)
  @Column('char', { length: 36 })
  referral_code: string;

  // 创建时间
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // 更新时间
  @Column('datetime', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;
}
