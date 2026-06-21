import { Module } from '@nestjs/common';
import { IgdbGenresService } from './igdb-genres.service';
import { IgdbGenresController } from './igdb-genres.controller';
import { IgdbApiModule } from '../igdb-api/igdb-api.module';

@Module({
  imports: [IgdbApiModule],
  providers: [IgdbGenresService],
  controllers: [IgdbGenresController],
})
export class IgdbGenresModule {}
