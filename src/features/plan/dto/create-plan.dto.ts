import {
  IsString,
  MaxLength,
  IsIn,
  IsDateString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PlanStatus } from '@/common/enums/plan-status.enum';
import { PlanLevel } from '@/common/enums/plan-level.enum';

export class CreatePlanDTO {
  @IsString()
  @MaxLength(20)
  readonly name: string;

  @IsString()
  readonly desc: string;

  @IsString()
  readonly doc: string;

  @IsIn([PlanLevel.URGENT, PlanLevel.HIGH, PlanLevel.MIDDLE, PlanLevel.LOW])
  @IsOptional()
  readonly level?: PlanLevel;

  @IsIn([
    PlanStatus.NOT_START,
    PlanStatus.REVIWEING,
    PlanStatus.DEVELOPING,
    PlanStatus.TESTING,
    PlanStatus.RELEASED,
  ])
  @IsOptional()
  readonly status?: PlanStatus;

  @IsDateString()
  @IsOptional()
  readonly review_at?: Date;

  @IsDateString()
  @IsOptional()
  readonly test_at?: Date;

  @IsDateString()
  @IsOptional()
  readonly release_at?: Date;

  @IsNumber({}, { each: true })
  readonly users: number[];
}
