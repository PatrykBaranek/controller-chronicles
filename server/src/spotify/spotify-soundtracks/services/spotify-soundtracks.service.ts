import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { SpotifyTokenService } from '../../services/spotify-token.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable({ scope: Scope.REQUEST })
export class SpotifySoundtracksService {
  constructor(
    private readonly spotifyTokenService: SpotifyTokenService,
    private readonly gamesService: GamesService,
  ) {}

  async getSoundtracksForGame(req: Request, gameId: number) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) return [];

    const game = await this.gamesService.getGameById(gameId);

    const soundtracks = await api.searchAlbums(
      game.rawgGame.name + ' soundtrack',
    );

    return soundtracks.body.albums!.items.filter((item) =>
      item.name.includes(game.rawgGame.name),
    );
  }

  async getPlaylistsForGame(req: Request, gameId: number) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) return [];

    const game = await this.gamesService.getGameById(gameId);

    const playlists = await api.searchPlaylists(game.rawgGame.name);

    return playlists.body.playlists!.items.filter((item) =>
      item.name.includes(game.rawgGame.name),
    );
  }

  async addSoundtrack(req: Request, id: string) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) {
      throw new BadRequestException('Spotify account not linked');
    }

    const isInLibrary = (await api.containsMySavedAlbums([id])).body[0];
    if (isInLibrary) {
      throw new BadRequestException('Soundtrack is already saved');
    }

    await api.addToMySavedAlbums([id]);
    return { message: 'Soundtrack added successfully' };
  }

  async removeSoundtrack(req: Request, id: string) {
    const api = await this.spotifyTokenService.getApi(req);
    if (!api) {
      throw new BadRequestException('Spotify account not linked');
    }

    const isInLibrary = (await api.containsMySavedAlbums([id])).body[0];
    if (!isInLibrary) {
      throw new BadRequestException('Soundtrack is not saved');
    }

    await api.removeFromMySavedAlbums([id]);
    return { message: 'Soundtrack removed successfully' };
  }
}
