import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanUserEntity } from './entity/plan-user.entity';
import { PlanEntity } from './entity/plan.entity';
import { PlanController } from './plan.controller';
import { PlanSerivce } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity, PlanUserEntity])],
  providers: [PlanSerivce],
  controllers: [PlanController],
  exports: [PlanSerivce],
})
export class PlanModule {}
