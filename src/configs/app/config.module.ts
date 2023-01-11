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
        APP_PORT: Joi.number().default(3300),
        APP_URL: Joi.string().default('http://localhost:3300'),
        APP_INITIAL_ADMINISTRATOR_FULLNAME: Joi.string(),
        APP_INITIAL_ADMINISTRATOR_JOB_NUMBER: Joi.number(),
        APP_INITIAL_ADMINISTRATOR_PASSWORD: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
