import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MediaPathTransformer } from '@/database/database.transformer';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 项目名称
  @Column('varchar', { length: 20 })
  name: string;

  // 项目 logo
  @Column('varchar', {
    nullable: true,
    transformer: new MediaPathTransformer(),
  })
  logo: string;

  // 项目描述
  @Column('text', { nullable: true })
  desc: string;

  // 创建时间
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // 更新时间
  @Column('datetime', { onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updated_at: Date;
}
