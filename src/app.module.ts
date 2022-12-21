import { Module } from '@nestjs/common';

// CONFIG
import { AppConfigModule } from './config/app/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AppConfigModule, TypeormConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
