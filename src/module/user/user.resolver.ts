import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => UserEntity)
  public async removeUser(@Args('id') id: number): Promise<any> {
    return this.userService.remove(id);
  }

  @Mutation(() => UserEntity)
  public async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.update(id, updateUserInput);
  }

  @Query(() => UserEntity)
  public async user(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }

  @Query(() => [UserEntity])
  public async users(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
