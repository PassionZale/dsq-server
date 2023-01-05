import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '@/common/enum/user-role.enum';
import { UserStatus } from '@/common/enum/user-status.enum';
import { MediaPathTransformer } from '@/database/database.transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 头像
  @Column('varchar', {
    default: 'media/icons/avatar.jpg',
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
    enum: [UserRole.ADMINISTRATOR, UserRole.DEVELOPER, UserRole.STAFF],
    default: UserRole.STAFF,
  })
  role: UserRole;

  // 状态
  @Column('enum', {
    enum: [
      UserStatus.ACTIVED,
      UserStatus.FORZEN,
      UserStatus.INACTIVATED,
      UserStatus.LOSED,
    ],
    default: UserStatus.INACTIVATED,
  })
  status: UserStatus;

  // 创建时间
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // 更新时间
  @Column('datetime', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;
}
