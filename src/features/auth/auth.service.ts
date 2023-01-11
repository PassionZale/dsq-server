import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';

import { UserStatus } from '@/common/enums/user-status.enum';
import { encrypt, verify } from '@/common/helpers/bcrypt.helper';
import { UserRole } from '@/common/enums/user-role.enum';
import { AppConfigService } from '@/configs/app/config.service';
import { ApiException } from '@/core/filters/api-exception.filter';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { IJwtAccessToken } from './interface';
import { LoginDTO } from './dto/login.dto';
import { ActivateUserDTO, InitAdminDTO } from './dto/activate.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  public async validateUserPassword(loginDTO: LoginDTO) {
    const { job_number, password } = loginDTO;

    const user = await this.userService.findOneWhere({ job_number }, true);

    if (user) {
      const { hashed_password, ...rest } = user;

      await this.validateUserStatus(rest.status);

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

  public async createAccessToken(user: UserEntity): Promise<IJwtAccessToken> {
    const sub = { user_id: user.id };

    return {
      access_token: this.jwtService.sign(sub),
    };
  }

  public async validatePayload(id: number): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }

  public async activateUser(activateUserDTO: ActivateUserDTO) {
    const { referral_code, job_number, password } = activateUserDTO;

    const user = await this.userService.findOneWhere({
      job_number,
      referral_code,
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

      return this.userService.update(user.id, user);
    }

    throw new ApiException('激活失败');
  }

  public async createAdministratorByEnv() {
    const isExsit = await this.userService.findOneWhere({
      role: UserRole.ADMINISTRATOR,
    });

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
      'fullname' | 'job_number' | 'hashed_password' | 'status' | 'role'
    > = {
      fullname: initalAdmin.fullname,
      job_number: initalAdmin.job_number,
      hashed_password: encrypt(initalAdmin.password),
      status: UserStatus.ACTIVED,
      role: UserRole.ADMINISTRATOR,
    };

    return this.userService.create(user);
  }
}
