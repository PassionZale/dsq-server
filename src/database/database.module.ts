import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from '@/config/typeorm/config.service';
import { TypeormConfigModule } from '@/config/typeorm/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeormConfigModule],
      inject: [TypeormConfigService],
      useFactory: (typeormConfigService: TypeormConfigService) => {
        return typeormConfigService.configs;
      },
    }),
  ],
})
export class DatabaseModule {}
