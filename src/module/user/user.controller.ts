import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
