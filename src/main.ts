import { NestFactory } from '@nestjs/core';
import { ValidationError } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from './configs/app/config.service';
import { ApiException } from './filter/api-exception.filter';
import { AnyExceptionFilter } from './filter/any-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ApiValidationPipe } from './pipe/api-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const appConfig: AppConfigService = app.get(AppConfigService);

  await app.listen(appConfig.port);
}
bootstrap();
