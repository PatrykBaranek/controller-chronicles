import { Module } from '@nestjs/common';
import { RawgGenresService } from './rawg-genres.service';
import { RawgGenresController } from './rawg-genres.controller';
import { RawgApiModule } from '../rawg-api/rawg-api.module';

@Module({
  imports: [RawgApiModule],
  providers: [RawgGenresService],
  controllers: [RawgGenresController],
})
export class RawgGenresModule {}
