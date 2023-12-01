import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { CollectionsModule } from '../collections/collections.module';
import { EmailModule } from 'src/email/email.module';
import { GamesModule } from '../games/games.module';
import { GamesUpdateModule } from '../games-update/games-update.module';
import { ReviewsSitesModule } from '../reviews-sites/reviews-sites.module';
import { SpotifyModule } from '../spotify/spotify.module';

import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/global-exception.filter';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { SteamModule } from 'src/steam/steam.module';
import { RssModule } from 'src/rss/rss.module';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    SpotifyModule,
    ReviewsSitesModule,
    AuthModule,
    CollectionsModule,
    GamesModule,
    GamesUpdateModule,
    SteamModule,
    YoutubeModule,
    GamesUpdateModule,
    EmailModule,
    RssModule
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
