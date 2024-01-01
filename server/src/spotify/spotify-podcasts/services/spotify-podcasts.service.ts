import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SpotifyAuthService } from '../../spotify-auth/services/spotify-auth.service';
import { SpotifyItemObjectDto } from '../../dto/spotify-item-object.dto';
import { PagingObjectDto } from 'src/spotify/dto/pagining-object.dto';
import { GetUserPodcastsDto } from 'src/spotify/dto/get-user-podcasts.dto';

const GAMING_KEYWORDS = ['games', 'video games', 'gaming', 'video game podcasts', 'gaming podcasts', 'game reviews'];

@Injectable()
export class SpotifyPodcastsService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
  ) {}

  async getAllGamePodcasts(limit: number, offset: number): Promise<PagingObjectDto<SpotifyItemObjectDto[]>> {
    const query = GAMING_KEYWORDS.map((keyword) => `${keyword}`).join(' OR ');

    const response = await this.spotifyAuthService.api.searchShows(query, { limit, offset });

    const items = plainToInstance(SpotifyItemObjectDto, response.body.shows.items);

    response.body.shows.items = items;

    return plainToInstance(PagingObjectDto<SpotifyItemObjectDto[]>, response.body.shows);
  }

  async getPodcastById(id: string): Promise<SpotifyItemObjectDto> {
    const response = await this.spotifyAuthService.api.getShow(id);
    return plainToInstance(SpotifyItemObjectDto, response.body);
  }

  async getUserPodcasts(limit: number, offset: number) {
    const response = await this.spotifyAuthService.api.getMySavedShows({ limit, offset });

    response.body.items.forEach(item => {
      item.show = plainToInstance(SpotifyItemObjectDto, item.show);
    });

    return plainToInstance(PagingObjectDto<GetUserPodcastsDto>, response.body);
  }

  async addPodcastToUserLibrary(id: string) {
    if (this.isInUserLibrary(id)) {
      throw new BadRequestException('Podcast is already saved');
  }

    await this.spotifyAuthService.api.addToMySavedShows([id]);
  }

  async removePodcastFromUserLibrary(id: string) {
    if (!this.isInUserLibrary(id)) {
      throw new BadRequestException('Podcast is not saved');
    }

    await this.spotifyAuthService.api.removeFromMySavedShows([id]);
  }

  private async isInUserLibrary(id: string) {
    return (await this.spotifyAuthService.api.containsMySavedShows([id])).body[0];
  }
}
