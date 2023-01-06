import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateDto } from './dto/activate.dto';
import { LoginDTO } from './dto/login.dto';
import { IJwtAccessToken } from './interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() loginDTO: LoginDTO): Promise<IJwtAccessToken> {
    const user = await this.authService.validateUserPassword(loginDTO);

    return this.authService.createAccessToken(user);
  }

  @Post('/activate/:referral_code')
  public async activate(
    @Param('referral_code') referral_code: string,
    @Body() activateDto: ActivateDto,
  ): Promise<IJwtAccessToken> {
    const user = await this.authService.activateUser({
      referral_code,
      ...activateDto,
    });

    return this.authService.createAccessToken(user);
  }
}
