import {
  IsString,
  MaxLength,
  IsIn,
  IsDateString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { PlanStatus } from '@/common/enum/plan-status.enum';
import { PlanLevel } from '@/common/enum/plan-level.enum';
import { PlanUserType } from '@/common/enum/plan-user-type.enum';

export class PlanUserDTO {
  @IsNumber()
  readonly user_id: number;

  @IsIn([
    PlanUserType.OWNER,
    PlanUserType.FRONTEND_DEVELOPER,
    PlanUserType.BACKEND_DEVELOPER,
    PlanUserType.TEST_DEVELOPER,
    PlanUserType.PROJECT_MANAGER,
  ])
  readonly user_type: PlanUserType;
}

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

  @ValidateNested({ each: true })
  @IsOptional()
  readonly users: PlanUserDTO[];
}
