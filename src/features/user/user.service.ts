import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { validate } from 'class-validator';

import { UserRole } from '@/common/enums/user-role.enum';
import { generateReferralCode } from '@/common/helpers/referral-code.helper';
import { AppConfigService } from '@/configs/app/config.service';
import { ApiException } from '@/core/filters/api-exception.filter';

import { UserEntity } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { InitAdminDTO } from '../auth/dto/activate.dto';
import { encrypt } from '@/common/helpers/bcrypt.helper';
import { UserStatus } from '@/common/enums/user-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly appConfigService: AppConfigService,
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

  public async createAdministratorByEnv() {
    const isExsit = await this.findOneWhere({ role: UserRole.ADMINISTRATOR });

    if (isExsit) {
      throw new ApiException('请勿重复初始化管理员');
    }

    const initalAdmin = new InitAdminDTO();

    initalAdmin.fullname = this.appConfigService.initial_admin_fullname;
    initalAdmin.job_number = this.appConfigService.initial_admin_job_number;
    initalAdmin.password = this.appConfigService.initial_admin_password;

    const errors = await validate(initalAdmin);

    if (errors.length) {
      throw new ApiException(Object.values(errors[0].constraints)[0]);
    }

    const user: Pick<
      UserEntity,
      | 'fullname'
      | 'job_number'
      | 'hashed_password'
      | 'status'
      | 'role'
      | 'referral_code'
    > = {
      fullname: initalAdmin.fullname,
      job_number: initalAdmin.job_number,
      hashed_password: encrypt(initalAdmin.password),
      status: UserStatus.ACTIVED,
      role: UserRole.ADMINISTRATOR,
      referral_code: generateReferralCode(),
    };

    return this.userRepository.save(user);
  }
}
