import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanUserEntity } from './entity/plan-user.entity';
import { PlanEntity } from './entity/plan.entity';
import { PlanResolver } from './plan.resolver';
import { PlanSerivce } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity, PlanUserEntity])],
  providers: [PlanSerivce, PlanResolver],
  controllers: [],
  exports: [PlanSerivce],
})
export class PlanModule {}
