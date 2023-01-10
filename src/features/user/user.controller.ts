import { Body, Controller, Post } from '@nestjs/common';
import { user as UserModel } from '@prisma/client';

import { UserRole } from '@/common/enums/user-role.enum';
import { Role } from '@/core/decorators/role.decorator';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserModel> {
    return await this.userService.create(createUserDTO);
  }
}
