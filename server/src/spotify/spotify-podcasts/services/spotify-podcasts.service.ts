import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { SpotifyTokenService } from '../../services/spotify-token.service';
import { SpotifyItemObjectDto } from '../../dto/spotify-item-object.dto';
import { PagingObjectDto } from 'src/spotify/dto/pagining-object.dto';
import { GetUserPodcastsDto } from 'src/spotify/dto/get-user-podcasts.dto';

const GAMING_KEYWORDS = [
  'games',
  'video games',
  'gaming',
  'video game podcasts',
  'gaming podcasts',
  'game reviews',
];

@Injectable({ scope: Scope.REQUEST })
export class SpotifyPodcastsService {
  constructor(private readonly spotifyTokenService: SpotifyTokenService) {}

  private async getApi(req: Request) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) {
      throw new BadRequestException('Spotify account not linked');
    }
    return api;
  }

  async getAllGamePodcasts(
    req: Request,
    limit: number,
    offset: number,
  ): Promise<PagingObjectDto<SpotifyItemObjectDto[]>> {
    const api = await this.getApi(req);
    const query = GAMING_KEYWORDS.map((keyword) => `${keyword}`).join(' OR ');

    const response = await api.searchShows(query, { limit, offset });

    const items = plainToInstance(
      SpotifyItemObjectDto,
      response.body.shows!.items,
    );

    response.body.shows!.items = items;

    return plainToInstance(
      PagingObjectDto<SpotifyItemObjectDto[]>,
      response.body.shows,
    );
  }

  async getPodcastById(req: Request, id: string): Promise<SpotifyItemObjectDto> {
    const api = await this.getApi(req);
    const response = await api.getShow(id);
    return plainToInstance(SpotifyItemObjectDto, response.body);
  }

  async getUserPodcasts(req: Request, limit: number, offset: number) {
    const api = await this.getApi(req);
    const response = await api.getMySavedShows({ limit, offset });

    response.body.items.forEach((item) => {
      item.show = plainToInstance(SpotifyItemObjectDto, item.show);
    });

    return plainToInstance(PagingObjectDto<GetUserPodcastsDto>, response.body);
  }

  async addPodcastToUserLibrary(req: Request, id: string) {
    const api = await this.getApi(req);
    const podcastInLibrary = (await api.containsMySavedShows([id])).body[0];
    if (podcastInLibrary) {
      throw new BadRequestException('Podcast is already saved');
    }

    await api.addToMySavedShows([id]);
  }

  async removePodcastFromUserLibrary(req: Request, id: string) {
    const api = await this.getApi(req);
    const podcastInLibrary = (await api.containsMySavedShows([id])).body[0];
    if (!podcastInLibrary) {
      throw new BadRequestException('Podcast is not saved');
    }

    await api.removeFromMySavedShows([id]);
  }
}
