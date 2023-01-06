import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import configuration from './configuration';
import { JwtConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default('jwt secret'),
        JWT_EXPIRATION_TIME: Joi.string().default('30 days'),
      }),
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
