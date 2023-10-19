import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { SpotifyAuthService } from './spotify/spotify-auth/spotify-auth.service';
import scopes from './spotify/scopes';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  const spotifyAuthService = app.get(SpotifyAuthService);

  const config = new DocumentBuilder()
    .setTitle('Controllers Chronicles Api')
    .setDescription('The Controllers Chronicles API description')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: spotifyAuthService.getAuthorizeURL(),
          tokenUrl: 'http://localhost:3000/api/spotify/auth/token',
          scopes: {
            ...scopes,
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
