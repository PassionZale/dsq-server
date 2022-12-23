import { PlanStatus } from '@/common/enum/plan-status.enum';
import { PlanLevel } from '@/common/enum/priority-level.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // 优先级
  @Column('enum', {
    enum: [PlanLevel.URGENT, PlanLevel.HIGH, PlanLevel.MIDDLE, PlanLevel.LOW],
    default: PlanLevel.LOW,
  })
  level: number;

  // 状态
  @Column('enum', {
    enum: [
      PlanStatus.NOT_START,
      PlanStatus.REVIWEING,
      PlanStatus.DEVELOPING,
      PlanStatus.TESTING,
      PlanStatus.RELEASED,
    ],
    default: PlanStatus.NOT_START,
  })
  status: number;

  // 迭代文档
  @Column('text')
  doc: string;

  // 终审时间
  @Column('timestamp', { nullable: true })
  review_at: Date;

  // 提测时间
  @Column('timestamp', { nullable: true })
  test_at: Date;

  // 上线时间
  @Column('timestamp', { nullable: true })
  release_at: Date;
}
