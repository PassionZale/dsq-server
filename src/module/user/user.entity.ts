import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@/common/enum/user-role.enum';
import { UserStatus } from '@/common/enum/user-status.enum';
import { MediaPathTransformer } from '@/database/database.transformer';

@Entity('user')
@ObjectType()
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // 头像
  @Field()
  @Column('varchar', {
    default: 'media/icons/avatar.jpg',
    transformer: new MediaPathTransformer(),
  })
  avatar: string;

  // 姓名：真实姓名
  @Field()
  @Column('varchar', { length: 20 })
  fullname: string;

  // 工号：登录账号
  @Field()
  @Column('int', { unique: true })
  job_number: number;

  // 密码：登录密码
  @Field()
  @Column('varchar', { select: false, nullable: true })
  hashed_password?: string;

  // 角色
  @Field()
  @Column('enum', {
    enum: [UserRole.ADMINISTRATOR, UserRole.DEVELOPER, UserRole.STAFF],
    default: UserRole.STAFF,
  })
  role: UserRole;

  // 状态
  @Field()
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
  @Field()
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // 更新时间
  @Field()
  @Column('datetime', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;
}
