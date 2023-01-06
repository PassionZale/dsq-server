import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDTO {
  @IsNumber()
  @IsNotEmpty()
  job_number: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
