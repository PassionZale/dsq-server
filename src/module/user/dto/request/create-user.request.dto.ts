import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MaxLength(20)
  readonly fullname: string;

  @Field()
  @IsNumber()
  readonly job_number: number;
}
