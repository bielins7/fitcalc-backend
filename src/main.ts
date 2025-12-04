import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 LOGS DETALHADOS PARA REVELAR O ERRO REAL
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose']);

  // 🔥 VALIDATION PIPE (com whitelist e forbidNonWhitelisted)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true, // ← isso gera erros do tipo “property X should not exist”
    })
  );

  // 🔥 CORS ativado
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

bootstrap();
