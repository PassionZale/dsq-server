import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PublicApi } from '@/core/decorators/public-api.decorator';
import { AuthService } from './auth.service';
import { ActivateDTO } from './dto/activate.dto';
import { LoginDTO } from './dto/login.dto';
import { IJwtAccessToken } from './interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicApi()
  @Post('/login')
  public async login(@Body() loginDTO: LoginDTO): Promise<IJwtAccessToken> {
    const user = await this.authService.validateUserPassword(loginDTO);

    return this.authService.createAccessToken(user);
  }

  @PublicApi()
  @Post('/activate/:referral_code')
  public async activate(
    @Param('referral_code') referral_code: string,
    @Body() activateDto: ActivateDTO,
  ): Promise<IJwtAccessToken> {
    const user = await this.authService.activateUser({
      referral_code,
      ...activateDto,
    });

    return this.authService.createAccessToken(user);
  }

  @PublicApi()
  @Get('/initial-administrator-just-once')
  public async initialAdministratorJustOnce() {
    return await this.authService.createAdministratorByEnv();
  }
}
