import { PlanStatus } from '@/common/enums/plan-status.enum';
import { PlanLevel } from '@/common/enums/plan-level.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@/features/user/user.entity';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 迭代名称
  @Column('varchar', { length: 20 })
  name: string;

  // 迭代说明
  @Column('text')
  desc: string;

  // 迭代文档
  @Column('text')
  doc: string;

  // 优先级
  @Column('enum', {
    enum: PlanLevel,
    default: PlanLevel.LOW,
  })
  level: PlanLevel;

  // 状态
  @Column('enum', {
    enum: PlanStatus,
    default: PlanStatus.NOT_START,
  })
  status: PlanStatus;

  // 终审时间
  @Column('datetime', { nullable: true })
  review_at?: Date;

  // 提测时间
  @Column('datetime', { nullable: true })
  test_at?: Date;

  // 上线时间
  @Column('datetime', { nullable: true })
  release_at?: Date;

  users?: UserEntity[];
}
