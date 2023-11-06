import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';

import { CollectionsModule } from '../collections/collections.module';

import { SpotifyModule } from '../spotify/spotify.module';

import { GamesModule } from '../games/games.module';

import { ReviewsSitesModule } from '../reviews-sites/reviews-sites.module';
import { GamesUpdateModule } from '../games-update/games-update.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/global-exception.filter';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 100,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    SpotifyModule,
    ReviewsSitesModule,
    AuthModule,
    CollectionsModule,
    GamesModule,
    GamesUpdateModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AxiosExceptionFilter,
    }
  ],
})
export class AppModule {}
