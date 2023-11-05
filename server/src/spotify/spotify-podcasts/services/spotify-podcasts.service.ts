import { Injectable, NotFoundException } from '@nestjs/common';
import { SpotifyAuthService } from '../../spotify-auth/services/spotify-auth.service';
import { GetAllGamingPodcastsDto } from '../../dto/get-all-gaming-podcasts.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SpotifyPodcastsService {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  async getAllGamePodcasts(
    language: string,
  ): Promise<SpotifyApi.PagingObject<GetAllGamingPodcastsDto>> {
    let gamingKeywords = ['games', 'video games', 'gameplay'];

    if (language === 'pl') {
      gamingKeywords = ['gry wideo', 'gry komputerowe'];
    }

    const query = gamingKeywords.map((keyword) => `${keyword}`).join(' OR ');

    const response = await this.spotifyAuthService.api.searchShows(query);

    return {
      ...response.body.shows,
      items: plainToInstance(
        GetAllGamingPodcastsDto,
        response.body.shows.items,
      ),
    };
  }

  async getPodcastById(id: string) {
    try {
      const response = await this.spotifyAuthService.api.getShow(id);
      return response.body;
    } catch (error) {
      throw new NotFoundException('Podcast not found');
    }
  }

  async getPodcastsFromUserLibrary() {
    const podcastList = await this.spotifyAuthService.api.getMySavedShows();

    return podcastList.body;
  }

  async addPodcastToUserLibrary(id: string) {
    await this.spotifyAuthService.api.addToMySavedShows([id]);
  }

  async removePodcastFromUserLibrary(id: string) {
    try {
      await this.spotifyAuthService.api.removeFromMySavedShows([id]);
    } catch (err) {
      throw new NotFoundException('Podcast not found');
    }
  }

  async getNewEpisodesForPodcast(id: string) {
    try {
      const response = await this.spotifyAuthService.api.getShowEpisodes(id, {
        limit: 1,
      });

      return response.body.items[0];
    } catch (err) {
      throw new NotFoundException('Podcast not found');
    }
  }
}
