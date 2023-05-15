import { Module } from '@nestjs/common';
import { RawgDevelopersModule } from './rawg-developers/rawg-developers.module';
import { RawgGamesModule } from './rawg-games/rawg-games.module';
import { RawgGenresModule } from './rawg-genres/rawg-genres.module';
import { RawgTagsModule } from './rawg-tags/rawg-tags.module';
import { RawgApiGamesService } from './rawg-api/rawg-api-games/rawg-api-games.service';

@Module({
  imports: [
    RawgDevelopersModule,
    RawgGamesModule,
    RawgGenresModule,
    RawgTagsModule,
  ],
})
export class RawgModule {}
