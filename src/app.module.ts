import { Module } from '@nestjs/common';

// CONFIG
import { AppConfigModule } from './config/app/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

// MODULE
import { UserModule } from './module/user/user.module';
import { PlanModule } from './module/plan/plan.module';

@Module({
  imports: [
    AppConfigModule,
    TypeormConfigModule,

    DatabaseModule,

    UserModule,
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
