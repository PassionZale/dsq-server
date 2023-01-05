import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.create({ ...createUserDTO });

    return this.userRepository.save(user);
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  public async update(
    id: number,
    updateUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDTO,
    });

    if (!user) {
      throw new Error(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }
}
