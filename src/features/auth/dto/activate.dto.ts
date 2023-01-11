import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivateDTO {
  @IsNumber()
  @IsNotEmpty()
  job_number: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class InitAdminDTO extends PartialType(ActivateDTO) {
  @IsString()
  @IsNotEmpty()
  fullname: string;
}

export class ActivateUserDTO extends PartialType(ActivateDTO) {
  @IsString()
  @IsNotEmpty()
  referral_code: string;
}
