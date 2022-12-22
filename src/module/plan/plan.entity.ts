import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('plan')
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 迭代名称
  @Column('varchar')
  name: string;

  // 迭代负责人
  @Column('int')
  user_id: number;

  user?: UserEntity;
}
