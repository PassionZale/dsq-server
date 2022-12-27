import { UserInputError } from 'apollo-server-express';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { UpdateUserDto } from './dto/request/update-user.request.dto';
import { Pagination } from '@/common/interface/pagination';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  public async users(@Args() pagination: Pagination): Promise<UserEntity[]> {
    return this.userService.findAll(pagination);
  }

  @Query(() => UserEntity)
  public async user(@Args('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new UserInputError(`${id}`);
    }
    return user;
  }

  @Mutation(() => UserEntity)
  public async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.create(createUserDto);
  }

  @Mutation(() => UserEntity)
  public async updateUser(
    @Args('id') id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.update(id, updateUserDto);
  }

  @Mutation(() => UserEntity)
  public async removeUser(@Args('id') id: number): Promise<any> {
    return this.userService.remove(id);
  }
}
