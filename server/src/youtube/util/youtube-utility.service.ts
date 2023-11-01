import { Injectable, NotFoundException } from '@nestjs/common';
import { isBefore } from 'date-fns';
import { GamesService } from 'src/games/services/games.service';
import { SearchResultDto } from '../dto/search-result.dto';

export enum VideoType {
  REVIEW  = 'review',
  TRAILER = 'trailer',
}

export const REVIEW_CHANNEL_IDS = {
  IGN:              'UCKy1dAqELo0zrOtPkf0eTMw',
  GAMESPOT:         'UCbu2SsF-Or3Rsn3NxqODImw',
  DIGITAL_FOUNDARY: 'UC9PBzalIcEQCsiIkq36PyUA',
  GAME_INFORMER:    'UCK-65DO2oOxxMwphl2tYtcw',
  GAMES_RADAR:      'UCk2ipH2l8RvLG0dr-rsBiZw',
};

@Injectable()
export class YoutubeUtilityService {

  constructor(
    private readonly gamesService: GamesService,
  ) {}

  getVideoFieldName(videoType: VideoType): string {
    return videoType === VideoType.REVIEW ? 'video_reviews' : 'game_trailers';
  }

  async fetchGame(id: number, videoType: VideoType) {
    const game = await this.gamesService.getGameById(id);
    if (videoType === VideoType.REVIEW && isBefore(new Date(), new Date(game.rawgGame.released))) {
      throw new NotFoundException('Game not released yet');
    }
    return game;
  }

  
  constructQuery(gameName: string, videoType: VideoType, lang: 'pl' | 'en' = 'en'): string {
    if (videoType === VideoType.REVIEW) {
      return `${gameName} ${lang === 'pl' ? 'recenzja' : 'review'}`;
    }
    return `${gameName} Official Trailer`;
  }

  filterResults(gameName: string, videos: SearchResultDto[]) {
    const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(gameName.toLowerCase()));

    if (filteredVideos.length === 0) {
      return videos;
    }

    return filteredVideos;
  }
}