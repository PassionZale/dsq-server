import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user as UserModel } from '@prisma/client';

import { UserStatus } from '@/common/enums/user-status.enum';
import { encrypt, verify } from '@/common/helpers/bcrypt.helper';
import { ApiException } from '@/core/filters/api-exception.filter';
import { PrismaService } from '@/core/services/prisma.service';
import { IJwtAccessToken } from './interface';
import { LoginDTO } from './dto/login.dto';
import { ActivateUserDTO } from './dto/activate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUserPassword(loginDTO: LoginDTO) {
    const { job_number, password } = loginDTO;

    const user = await this.prisma.user.findUnique({
      where: { job_number },
    });

    if (user) {
      const { hashed_password, ...rest } = user;

      await this.validateUserStatus(rest.status as UserStatus);

      if (verify(password, hashed_password)) {
        return rest;
      }
    }

    throw new ApiException('账户或密码错误');
  }

  public async validateUserStatus(status: UserStatus) {
    switch (status) {
      case UserStatus.ACTIVED:
        break;

      case UserStatus.FORZEN:
        throw new ApiException('账户已被冻结');

      case UserStatus.INACTIVATED:
        throw new ApiException('账户未激活');

      case UserStatus.LOSED:
        throw new ApiException('账户已离职');

      default:
        throw new ApiException('账户异常');
    }
  }

  public async createAccessToken(user: UserModel): Promise<IJwtAccessToken> {
    const sub = { user_id: user.id };

    return {
      access_token: this.jwtService.sign(sub),
    };
  }

  public async validatePayload(id: number): Promise<UserModel> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  public async activateUser(activateUserDTO: ActivateUserDTO) {
    const { referral_code, job_number, password } = activateUserDTO;

    const user = await this.prisma.user.findFirst({
      where: {
        job_number,
        referral_code,
      },
    });

    if (user) {
      if (user.status === UserStatus.ACTIVED) {
        throw new ApiException('请不要重复激活');
      }

      if (user.status !== UserStatus.INACTIVATED) {
        throw new ApiException('账户无法激活');
      }

      user.hashed_password = encrypt(password);
      user.status = UserStatus.ACTIVED;

      return this.prisma.user.update({
        where: { id: user.id },
        data: user,
      });
    }

    throw new ApiException('激活失败');
  }
}
