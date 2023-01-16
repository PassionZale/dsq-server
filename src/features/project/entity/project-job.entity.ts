import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project_job')
export class ProjectJobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  project_id: number;
}
