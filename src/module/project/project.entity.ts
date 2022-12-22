import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 项目编码
  @Column('varchar', { unique: true })
  code: string;

  // 项目名称
  @Column('varchar')
  name: string;
}
