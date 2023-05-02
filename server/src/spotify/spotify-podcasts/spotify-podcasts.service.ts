import { Injectable, NotFoundException } from '@nestjs/common';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';

@Injectable()
export class SpotifyPodcastsService {
  constructor(private readonly spotifyAuthService: SpotifyAuthService) {}

  async getAllGamePodcasts(language: string) {
    let query = 'games';

    if (language === 'pl') {
      query = 'gry';
    }

    const response = await this.spotifyAuthService.api.searchShows(query, {});

    return response.body.shows.items;
  }

  async getPodcastById(id: string) {
    try {
      const response = await this.spotifyAuthService.api.getShow(id);
      return response.body;
    } catch (error) {
      throw new NotFoundException('Podcast not found');
    }
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
