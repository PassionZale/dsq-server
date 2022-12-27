import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService {
  constructor(private configService: ConfigService) {}

  get configs(): TypeOrmModuleOptions {
    return {
      timezone: '+08:00',

      synchronize: false,

      dateStrings: true,

      autoLoadEntities: true,

      entities: ['dist/**/*.entity.{ts,js}'],

      // migration settings
      migrations: ['dist/database/migrations/**/*{.ts,.js}'],
      migrationsTableName: 'migration',

      // .env settings
      type: this.type as 'mysql' | 'mariadb',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
    };
  }

  get type(): string {
    return this.configService.get<string>('typeorm.type');
  }

  get host(): string {
    return this.configService.get<string>('typeorm.host');
  }

  get port(): number {
    return this.configService.get<number>('typeorm.port');
  }

  get username(): string {
    return this.configService.get<string>('typeorm.username');
  }

  get password(): string {
    return this.configService.get<string>('typeorm.password');
  }

  get database(): string {
    return this.configService.get<string>('typeorm.database');
  }
}
