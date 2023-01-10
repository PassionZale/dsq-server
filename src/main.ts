import { NestFactory } from '@nestjs/core';
import { ValidationError } from '@nestjs/common';

import { AppModule } from './app.module';

import { AppConfigService } from './configs/app/config.service';

import { AnyExceptionFilter } from './core/filters/any-exception.filter';
import { ApiException } from './core/filters/api-exception.filter';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';

import { TransformInterceptor } from './core/interceptors/transform.interceptor';

import { ApiValidationPipe } from './core/pipes/api-validation.pipe';
import { PrismaService } from './core/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // **全局 Jwt & Role Guard, 通过 app.module.ts 中的 providers 注入**

  // 全局管道验证
  app.useGlobalPipes(
    new ApiValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) =>
        new ApiException(Object.values(errors[0].constraints)[0]),
    }),
  );

  // 全局响应拦截
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局异常拦截
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());

  const prismaService: PrismaService = app.get(PrismaService);
  const appConfigService: AppConfigService = app.get(AppConfigService);

  await prismaService.enableShutdownHooks(app);
  await app.listen(appConfigService.port);
}

bootstrap();
