import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { RawgApiGamesService } from './rawg-api-games/rawg-api-games.service';
import { RawgApiDevelopersService } from './rawg-api-developers/rawg-api-developers.service';
import { RawgApiGenresService } from './rawg-api-genres/rawg-api-genres.service';
import { RawgApiTagsService } from './rawg-api-tags/rawg-api-tags.service';

@Module({
  imports: [HttpModule],
  providers: [
    RawgApiGamesService,
    RawgApiDevelopersService,
    RawgApiGenresService,
    RawgApiTagsService,
  ],
  exports: [
    RawgApiDevelopersService,
    RawgApiGenresService,
    RawgApiTagsService,
    RawgApiGamesService,
  ],
})
export class RawgApiModule {}
