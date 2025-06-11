import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './App.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { randomUUID } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (!globalThis.crypto) {
    globalThis.crypto = {
      randomUUID,
    } as Crypto;
  }

  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Credentials',
    ],
  });

  await app.listen(3333);
}
bootstrap();
