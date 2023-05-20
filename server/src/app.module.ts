import { Module } from '@nestjs/common';
import { SpotifyModule } from './spotify/spotify.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RawgModule } from './rawg/rawg.module';
import { ReviewsSitesModule } from './reviews-sites/reviews-sites.module';

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
    RawgModule,
    ReviewsSitesModule,
  ],
})
export class AppModule {}
