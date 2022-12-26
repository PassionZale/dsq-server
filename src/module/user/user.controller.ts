import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  list() {
    return this.userService.findAll();
  }
}
