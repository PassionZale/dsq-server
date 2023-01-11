import { UserRole } from '@/common/enums/user-role.enum';
import { Role } from '@/core/decorators/role.decorator';
import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.create(createUserDTO);
  }
}
