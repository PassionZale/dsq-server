import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivateDto {
  @IsNumber()
  @IsNotEmpty()
  job_number: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class ActivateUserDTO extends PartialType(ActivateDto) {
  @IsString()
  @IsNotEmpty()
  referral_code: string;
}
