import { UserRole } from '@/common/enums/user-role.enum';
import { PublicApi } from '@/core/decorators/public-api.decorator';
import { Role } from '@/core/decorators/role.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicApi()
  @Get('/initial-administrator-just-once')
  public async initialAdministratorJustOnce() {
    return await this.userService.createAdministratorByEnv();
  }

  @Role(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.create(createUserDTO);
  }
}
