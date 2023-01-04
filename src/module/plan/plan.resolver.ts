import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserEntity } from '../user/user.entity';
import { CreatePlanInput } from './dot/create-plan.input';
import { PlanEntity } from './entity/plan.entity';
import { PlanSerivce } from './plan.service';

@Resolver('Plan')
export class PlanResolver {
  constructor(private readonly planService: PlanSerivce) {}

  @Mutation(() => PlanEntity)
  public async createPlan(
    @Args('createPlanInput') createPlanInput: CreatePlanInput,
  ): Promise<PlanEntity> {
    return await this.planService.create(createPlanInput);
  }

  @ResolveField('users', () => [UserEntity])
  async getUsers(@Parent() plan: PlanEntity) {
    const { id } = plan;
  }
}
