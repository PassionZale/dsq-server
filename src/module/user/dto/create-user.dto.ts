import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MaxLength(20)
  readonly fullname: string;

  @IsNumber()
  readonly job_number: number;
}
