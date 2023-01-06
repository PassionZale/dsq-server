import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

import configuration from './configuration';
import { TypeormConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false,
      load: [configuration],
      validationSchema: Joi.object({
        TYPEORM_TYPE: Joi.string().valid('mysql', 'mariadb').default('mysql'),
        TYPEORM_HOST: Joi.string().default('127.0.0.1'),
        TYPEORM_PORT: Joi.number().default(3306),
        TYPEORM_USERNAME: Joi.string().default('root'),
        TYPEORM_PASSWORD: Joi.string().default('root'),
        TYPEORM_DATABASE: Joi.string().default('dsq'),
      }),
    }),
  ],
  providers: [ConfigService, TypeormConfigService],
  exports: [ConfigService, TypeormConfigService],
})
export class TypeormConfigModule {}
