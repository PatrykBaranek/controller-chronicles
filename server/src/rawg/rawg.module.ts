import { Module } from '@nestjs/common';
import { RawgDevelopersModule } from './rawg-developers/rawg-developers.module';
import { RawgGenresModule } from './rawg-genres/rawg-genres.module';
import { RawgTagsModule } from './rawg-tags/rawg-tags.module';

@Module({
  imports: [RawgDevelopersModule, RawgGenresModule, RawgTagsModule],
})
export class RawgModule {}
