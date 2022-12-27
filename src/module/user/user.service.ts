import { Pagination } from '@/common/interface/pagination';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { UpdateUserDto } from './dto/request/update-user.request.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll(pagination: Pagination): Promise<UserEntity[]> {
    const { limit, offset } = pagination;
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(user);
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
}
