import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { VerifyErrors } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { PUBLIC_API_OPTIONS } from '@/common/constants/meta.constant';
import { ApiErrorCode } from '@/common/enums/api-error-code.enum';
import { JwtErrorName } from '@/common/enums/jwt-error-name.enum';
import { ApiException } from '@/core/filters/api-exception.filter';
import { UserEntity } from '@/features/user/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicApi = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_API_OPTIONS,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicApi) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(
    err?: ApiException,
    user?: UserEntity,
    info?: VerifyErrors,
  ): any {
    // user 由 jwt.strategy.ts 中的 validate() 所返回
    if (user && !err && !info) {
      return user;
    }

    // err 由 jwt.strategy.ts 中的 validate() 所抛出
    if (err) {
      throw err;
    }

    // info 由 PassportStrategy 解析 jwt 失败所抛出
    if (info) {
      const name = info.name;

      throw new ApiException(
        JwtErrorName[name] || JwtErrorName.Default,
        ApiErrorCode.ACCESS_TOKEN_INVALID,
      );
    }
  }
}
