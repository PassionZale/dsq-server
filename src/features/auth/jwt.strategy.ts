import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfigService } from '@/configs/jwt/config.service';
import { AuthService } from './auth.service';
import { IJwtPayload } from './interface';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    jwtConfigSerivce: JwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigSerivce.secret,
    });
  }

  /**
   * 如果 PassportStrategy 解析请求头中的 authorization: "Bear ${access_token}"
   * 解析失败：抛出解析异常，不会调用此函数
   * 解析成功：调用此函数，函数内部实现自定义业务校验，返回用户或 null 或抛出自定义异常
   * 返回用户：会将当前返回值写入上下文中，可以通过 @Request() req.user 获取
   * @param payload JWT 负载
   */
  public async validate(payload: IJwtPayload): Promise<UserEntity> {
    const { user_id } = payload;

    const user = await this.authService.validatePayload(user_id);

    await this.authService.validateUserStatus(user.status);

    return user;
  }
}
