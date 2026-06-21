import { Module } from '@nestjs/common';
import { IgdbGenresModule } from './igdb-genres/igdb-genres.module';
import { IgdbDevelopersModule } from './igdb-developers/igdb-developers.module';

@Module({
  imports: [IgdbGenresModule, IgdbDevelopersModule],
})
export class IgdbModule {}
