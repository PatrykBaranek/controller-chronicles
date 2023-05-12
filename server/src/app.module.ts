import { Module } from '@nestjs/common';

import { SpotifyModule } from './spotify/spotify.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './games/games.module';
import { DevelopersModule } from './developers/developers.module';
import { GenresModule } from './genres/genres.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    SpotifyModule,
    GamesModule,
    DevelopersModule,
    GenresModule,
    TagsModule,
  ],
})
export class AppModule {}
