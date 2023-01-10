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
}
