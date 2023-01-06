import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDTO, PlanUserDTO } from './dto/create-plan.dto';
import { UpdatePlanDTO } from './dto/update-plan.dto';
import { PlanUserEntity } from './entity/plan-user.entity';
import { PlanEntity } from './entity/plan.entity';

@Injectable()
export class PlanSerivce {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,

    @InjectRepository(PlanUserEntity)
    private readonly planUserRepository: Repository<PlanUserEntity>,
  ) {}

  public async create(createPlanDTO: CreatePlanDTO): Promise<PlanEntity> {
    const { users, ...rest } = createPlanDTO;

    const plan = this.planRepository.create({ ...rest });

    const result = await this.planRepository.save(plan);

    await this.insertPlanUser(result.id, users);

    return plan;
  }

  public async remove(id: number) {
    await this.planRepository.delete(id);

    await this.planUserRepository.delete({ plan_id: id });
  }

  public async update(id: number, updatePlanDTO: UpdatePlanDTO) {
    const { users, ...rest } = updatePlanDTO;

    await this.planRepository.update(id, rest);

    await this.insertPlanUser(id, users);
  }

  public async findAll(): Promise<PlanEntity[]> {
    return await this.planRepository.find();
  }

  public async findOne(id: number): Promise<PlanEntity> {
    return await this.planRepository.findOneOrFail({ where: { id } });
  }

  public async insertPlanUser(plan_id: number, users: PlanUserDTO[]) {
    await this.planUserRepository
      .createQueryBuilder()
      .delete()
      .from(PlanUserEntity)
      .where({ plan_id })
      .execute();

    await this.planUserRepository
      .createQueryBuilder()
      .insert()
      .into(PlanUserEntity)
      .values(users.map((item) => ({ plan_id, ...item })))
      .execute();
  }
}
