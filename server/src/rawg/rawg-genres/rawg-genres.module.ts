import { Module } from '@nestjs/common';
import { RawgGenresService } from './rawg-genres.service';
import { HttpModule } from '@nestjs/axios';
import { RawgGenresController } from './rawg-genres.controller';

@Module({
  imports: [HttpModule],
  providers: [RawgGenresService],
  controllers: [RawgGenresController],
})
export class RawgGenresModule {}
