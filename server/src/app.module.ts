import { Module } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ReviewsSitesModule } from './reviews-sites/reviews-sites.module';
import { AuthModule } from './auth/auth.module';
import { CollectionsModule } from './collections/collections.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GamesModule } from './games/games.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 100,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
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
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
