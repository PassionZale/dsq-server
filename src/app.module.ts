import { Module } from '@nestjs/common';

// CONFIG
import { AppConfigModule } from './configs/app/config.module';
import { JwtConfigModule } from './configs/jwt/config.module';
import { TypeormConfigModule } from './configs/typeorm/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

// MODULE
import { AuthModule } from './features/auth/auth.module';
import { PlanModule } from './features/plan/plan.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    JwtConfigModule,
    TypeormConfigModule,

    DatabaseModule,

    AuthModule,
    PlanModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
