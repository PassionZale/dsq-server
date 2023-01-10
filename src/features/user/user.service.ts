import { Injectable } from '@nestjs/common';
import { Prisma, user as UserModel } from '@prisma/client';

import { generateReferralCode } from '@/common/helpers/referral-code.helper';
import { PrismaService } from '@/core/services/prisma.service';
import { ApiException } from '@/core/filters/api-exception.filter';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDTO: CreateUserDTO): Promise<UserModel> {
    const isExsit = await this.findOne({
      where: { job_number: createUserDTO.job_number },
    });

    if (isExsit) {
      throw new ApiException('用户已存在');
    }

    const user = await this.prisma.user.create({
      data: { ...createUserDTO, referral_code: generateReferralCode() },
    });

    return user;
  }

  public async remove(id: number): Promise<any> {
    return await this.prisma.user.delete({ where: { id } });
  }

  public async update(
    id: number,
    updateUserDTO?: UpdateUserDTO,
  ): Promise<UserModel> {
    const isExsit = await this.findOne({
      where: { id },
    });

    if (!isExsit) {
      throw new ApiException('用户不存在');
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDTO,
    });

    return user;
  }

  public async findAll(): Promise<UserModel[]> {
    return await this.prisma.user.findMany();
  }

  public async findOne(
    where: Prisma.userWhereInput | Prisma.userWhereUniqueInput,
  ): Promise<UserModel> {
    // TODO
    return await this.prisma.user.findUnique({ where });
  }
}
