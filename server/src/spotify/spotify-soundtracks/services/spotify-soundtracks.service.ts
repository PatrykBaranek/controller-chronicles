import { BadRequestException, Injectable } from '@nestjs/common';
import { SpotifyAuthService } from '../../spotify-auth/services/spotify-auth.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class SpotifySoundtracksService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly gamesService: GamesService,
  ) {}

  async getSoundtracksForGame(gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

    const soundtracks = await this.spotifyAuthService.api.searchAlbums(game.rawgGame.name + ' soundtrack');

    return soundtracks.body.albums.items.filter(item => item.name.includes(game.rawgGame.name));
  }

  async getPlaylistsForGame(gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

    const playlists = await this.spotifyAuthService.api.searchPlaylists(game.rawgGame.name);

    return playlists.body.playlists.items.filter(item => item.name.includes(game.rawgGame.name));
  }

  async addSoundtrack(id: string) {
    if (this.isInUserLibrary(id)) {
      throw new BadRequestException('Soundtrack is already saved');
    }
    await this.spotifyAuthService.api.addToMySavedAlbums([id]);

    return {
      message: 'Soundtrack added successfully',
    };
  }

  async removeSoundtrack(id: string) {
    if (!this.isInUserLibrary(id)) {
      throw new BadRequestException('Soundtrack is not saved');
    }

    await this.spotifyAuthService.api.removeFromMySavedAlbums([id]);

    return {
      message: 'Soundtrack removed successfully',
    };
  }

  private async isInUserLibrary(id: string) {
    return (await this.spotifyAuthService.api.containsMySavedAlbums([id])).body[0];
  }
}
