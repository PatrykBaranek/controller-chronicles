import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';
import { RawgGamesService } from 'src/rawg/rawg-games/rawg-games.service';

@Injectable()
export class SpotifySoundtracksService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly rawgGamesService: RawgGamesService,
  ) {}

  async getSoundtracksForGame(gameId: number) {
    const game = await this.rawgGamesService.getGameById(gameId);

    const soundtracks = await this.spotifyAuthService.api.searchAlbums(
      game.rawgGame.name + ' soundtrack',
    );

    return soundtracks.body.albums.items;
  }

  async addSoundtrack(id: string) {
    try {
      await this.spotifyAuthService.api.addToMySavedAlbums([id]);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Soundtrack added successfully',
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
