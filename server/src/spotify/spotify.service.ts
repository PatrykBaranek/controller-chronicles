import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import scopes from './scopes';
import SpotifyWebApi from 'spotify-web-api-node';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FindEpisodeByGameDto } from './dto/find-episode-by-game.dto';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private spotifyApi: SpotifyWebApi;
  private readonly logger = new Logger(SpotifyService.name);

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: 'http://localhost:3000/spotify/callback',
    });
  }

  getAuthorizeURL(): string {
    return this.spotifyApi.createAuthorizeURL(scopes);
  }

  async handleAuthorizationCallback(code: string): Promise<void> {
    const data = await this.spotifyApi.authorizationCodeGrant(code);
    this.spotifyApi.setAccessToken(data.body['access_token']);
    this.spotifyApi.setRefreshToken(data.body['refresh_token']);

    this.refreshAccessTokenCronJob();
  }

  async getAllGamePodcasts(language: string) {
    let query = 'games';

    if (language === 'pl') {
      query = 'gry';
    }

    const response = await this.spotifyApi.searchShows(query, {});

    return response.body.shows.items;
  }

  async getPodcastById(id: string) {
    try {
      const response = await this.spotifyApi.getShow(id);
      return response.body;
    } catch (error) {
      throw new NotFoundException('Podcast not found');
    }
  }

  async getNewEpisodesForPodcast(id: string) {
    try {
      const response = await this.spotifyApi.getShowEpisodes(id, {
        limit: 1,
      });

      return response.body.items[0];
    } catch (err) {
      throw new NotFoundException('Podcast not found');
    }
  }

  async getEpisodesByGameTitle(
    findEpisodeByGameTitleDto: FindEpisodeByGameDto,
  ) {
    const response = await this.spotifyApi.searchEpisodes(
      findEpisodeByGameTitleDto.gameTitle.toLocaleLowerCase(),
      {
        limit: findEpisodeByGameTitleDto.limit,
      },
    );

    return response.body.episodes.items.filter((show) =>
      show.languages.includes(findEpisodeByGameTitleDto.language),
    );
  }

  async getEpisodeById(id: string) {
    const response = await this.spotifyApi.getEpisode(id);
    return response.body;
  }

  async addPodcastToUserLibrary(id: string) {
    await this.spotifyApi.addToMySavedShows([id]);
  }

  async removePodcastFromUserLibrary(id: string) {
    try {
      await this.spotifyApi.removeFromMySavedShows([id]);
    } catch (err) {
      throw new NotFoundException('Podcast not found');
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async refreshAccessTokenCronJob(): Promise<void> {
    try {
      await this.spotifyApi.clientCredentialsGrant();
      const data = await this.spotifyApi.refreshAccessToken();
      const newAccessToken = data.body['access_token'];

      this.spotifyApi.setAccessToken(newAccessToken);
      this.logger.log('Access token refreshed!');
    } catch (error) {
      this.logger.error('Error refreshing access token:', error);
    }
  }
}
