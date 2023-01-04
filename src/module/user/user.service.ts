import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }

  public async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create({ ...createUserInput });

    return this.userRepository.save(user);
  }

  public async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
