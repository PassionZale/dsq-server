import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfigService } from '@/config/typeorm/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (typeormConfigService: TypeormConfigService) => {
        const configs = typeormConfigService.configs;

        return { ...configs };
      },
    }),
  ],
})
export class DatabaseModule {}
