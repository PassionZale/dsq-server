import { Module } from '@nestjs/common';

// CONFIG
import { AppConfigModule } from './configs/app/config.module';
import { JwtConfigModule } from './configs/jwt/config.module';
import { TypeormConfigModule } from './configs/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

// MODULE
import { UserModule } from './features/user/user.module';
import { PlanModule } from './features/plan/plan.module';

@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
    TypeormConfigModule,

    DatabaseModule,

    UserModule,
    PlanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
