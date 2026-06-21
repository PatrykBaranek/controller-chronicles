import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';

import { initializeAuth } from './app/lib/auth';

async function bootstrap() {
  await initializeAuth();

  const { AppModule } = await import('./app/app.module');

  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Controllers Chronicles Api')
    .setDescription('The Controllers Chronicles API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use('/docs', apiReference({ content: document }));

  await app.listen(3000);
}
void bootstrap();
