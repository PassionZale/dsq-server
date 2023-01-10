import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// CONFIG
import { AppConfigModule } from './configs/app/config.module';
import { JwtConfigModule } from './configs/jwt/config.module';
import { TypeormConfigModule } from './configs/typeorm/config.module';
import { JwtAuthGuard } from './core/guard/jwt-auth.guard';
import { RoleGuard } from './core/guard/role.guard';

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
  providers: [
    // 全局 JwtAuthGuard 守卫
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 全局 RoleGuard 守卫
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
