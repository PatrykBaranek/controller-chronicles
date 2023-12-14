import { Module } from '@nestjs/common';

import { GamesModule } from 'src/games/games.module';

import { YoutubeController } from './controllers/youtube.controller';
import { YoutubeService }    from './services/youtube.service';
import { YoutubeUtilityService } from './util/youtube-utility.service';

@Module({
  imports: [GamesModule],
  controllers: [YoutubeController],
  providers: [YoutubeService, YoutubeUtilityService],
  exports: [YoutubeService],
})
export class YoutubeModule {}
