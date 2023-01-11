import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { generateReferralCode } from '@/common/helpers/referral-code.helper';
import { ApiException } from '@/core/filters/api-exception.filter';

import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const user = this.userRepository.create({ ...createUserDTO });

    user.referral_code = generateReferralCode();

    return this.userRepository.save(user);
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  public async update(
    id: number,
    updateUserDTO?: UpdateUserDTO,
  ): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDTO,
    });

    if (!user) {
      throw new ApiException('账户不存在');
    }
    return this.userRepository.save(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findOneWhere(
    condition: FindOptionsWhere<UserEntity>,
    withUnSelect = false,
  ): Promise<UserEntity> {
    const db = this.userRepository.createQueryBuilder('user').where(condition);

    if (withUnSelect) {
      db.addSelect('user.hashed_password');
    }

    const user = await db.getOne();

    return user;
  }
}
