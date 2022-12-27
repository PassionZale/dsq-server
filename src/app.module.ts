import { Module } from '@nestjs/common';

// CONFIG
import { AppConfigModule } from './config/app/config.module';
import { TypeormConfigModule } from './config/typeorm/config.module';
import { GraphqlModule } from './config/graphql/config.module';

// DATABASE
import { DatabaseModule } from './database/database.module';

// MODULE
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    TypeormConfigModule,

    GraphqlModule,
    DatabaseModule,

    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
