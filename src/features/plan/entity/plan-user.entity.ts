import { PlanUserType } from '@/common/enums/plan-user-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plan_user')
export class PlanUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 迭代ID
  @Column('int')
  plan_id: number;

  // 用户
  @Column('int')
  user_id: number;

  // 用户类型
  @Column('enum', {
    enum: PlanUserType,
  })
  user_type: PlanUserType;
}
