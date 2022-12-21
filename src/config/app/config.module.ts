import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import configuration from './configuration';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      load: [configuration],
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
