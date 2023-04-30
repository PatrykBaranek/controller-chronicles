import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { HttpModule } from '@nestjs/axios';
import { YoutubeService } from './youtube/youtube.service';

@Module({
  imports: [HttpModule],
  controllers: [GamesController],
  providers: [GamesService, YoutubeService],
})
export class GamesModule {}
