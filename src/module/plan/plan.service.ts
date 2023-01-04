import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanInput } from './dot/create-plan.input';
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

  public async create(createPlanInput: CreatePlanInput): Promise<PlanEntity> {
    const { users, ...rest } = createPlanInput;

    const plan = this.planRepository.create({ ...rest });

    const result = await this.planUserRepository.save(plan);

    await this.planUserRepository
      .createQueryBuilder()
      .insert()
      .into(PlanUserEntity)
      .values(users.map((item) => ({ plan_id: result.id, ...item })))
      .execute();

    return plan;
  }
}
