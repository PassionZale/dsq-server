import { PlanStatus } from '@/common/enum/plan-status.enum';
import { PlanLevel } from '@/common/enum/plan-level.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '@/module/user/user.entity';

@Entity('plan')
@ObjectType()
export class PlanEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // 迭代名称
  @Field()
  @Column('varchar', { length: 20 })
  name: string;

  // 迭代说明
  @Field()
  @Column('text')
  desc: string;

  // 迭代文档
  @Field()
  @Column('text')
  doc: string;

  // 优先级
  @Field()
  @Column('enum', {
    enum: [PlanLevel.URGENT, PlanLevel.HIGH, PlanLevel.MIDDLE, PlanLevel.LOW],
    default: PlanLevel.LOW,
  })
  level: PlanLevel;

  // 状态
  @Field()
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
  status: PlanStatus;

  // 终审时间
  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  review_at?: Date;

  // 提测时间
  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  test_at?: Date;

  // 上线时间
  @Field({ nullable: true })
  @Column('datetime', { nullable: true })
  release_at?: Date;

  @Field(() => [UserEntity], { nullable: true })
  users?: UserEntity[];
}
