import { UserRole } from '@/common/enums/user-role.enum';
import { UserType } from '@/common/enums/user-type.enum';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsOptional()
  readonly avatar?: string;

  @IsString()
  @MaxLength(20)
  readonly fullname: string;

  @IsNumber()
  readonly job_number: number;

  @IsIn([UserRole.ADMINISTRATOR, UserRole.DEVELOPER, UserRole.STAFF])
  @IsOptional()
  readonly role?: UserRole;

  @IsIn([
    UserType.OWNER,
    UserType.FRONTEND_DEVELOPER,
    UserType.BACKEND_DEVELOPER,
    UserType.PROJECT_MANAGER,
    UserType.TEST_DEVELOPER,
    UserType.NONE,
  ])
  @IsOptional()
  readonly type?: UserType;
}
