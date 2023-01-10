import { PublicApi } from '@/core/decorators/public-api.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicApi()
  @Post()
  public async create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.create(createUserDTO);
  }
}
