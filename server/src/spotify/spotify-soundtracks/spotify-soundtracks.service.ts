import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SpotifyAuthService } from '../spotify-auth/spotify-auth.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class SpotifySoundtracksService {
  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly gamesService: GamesService,
  ) {}

  async getSoundtracksForGame(gameId: number) {
    const game = await this.gamesService.getGameById(gameId);

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
