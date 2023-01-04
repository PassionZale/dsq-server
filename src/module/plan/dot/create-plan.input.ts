import { Field, InputType } from '@nestjs/graphql';
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

@InputType()
export class PlanUser {
  @Field()
  @IsNumber()
  readonly user_id: number;

  @Field()
  @IsIn([
    PlanUserType.OWNER,
    PlanUserType.FRONTEND_DEVELOPER,
    PlanUserType.BACKEND_DEVELOPER,
    PlanUserType.TEST_DEVELOPER,
    PlanUserType.PROJECT_MANAGER,
  ])
  @IsOptional()
  readonly user_type?: PlanUserType;
}

@InputType()
export class CreatePlanInput {
  @Field()
  @IsString()
  @MaxLength(20)
  readonly name: string;

  @Field()
  readonly desc: string;

  @Field()
  readonly doc: string;

  @Field()
  @IsIn([PlanLevel.URGENT, PlanLevel.HIGH, PlanLevel.MIDDLE, PlanLevel.LOW])
  @IsOptional()
  readonly level?: PlanLevel;

  @Field()
  @IsIn([
    PlanStatus.NOT_START,
    PlanStatus.REVIWEING,
    PlanStatus.DEVELOPING,
    PlanStatus.TESTING,
    PlanStatus.RELEASED,
  ])
  @IsOptional()
  readonly status?: PlanStatus;

  @Field()
  @IsDateString()
  @IsOptional()
  readonly review_at?: Date;

  @Field()
  @IsDateString()
  @IsOptional()
  readonly test_at?: Date;

  @Field()
  @IsDateString()
  @IsOptional()
  readonly release_at?: Date;

  @Field()
  @ValidateNested({ each: true })
  @IsOptional()
  readonly users?: PlanUser[];
}
