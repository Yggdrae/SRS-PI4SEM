import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './App.module';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  if (!globalThis.crypto) {
    globalThis.crypto = {
      randomUUID,
    } as Crypto;
  }

  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
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
