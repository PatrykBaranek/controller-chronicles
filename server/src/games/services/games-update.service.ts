import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { GamesRepository } from "../games.repository";
import { Game } from "../models/game.schema";

import { SteamReviewsService } from "src/steam/steam-reviews/steam-reviews.service";
import { SteamPlayersInGameService } from "src/steam/steam-in-game/steam-players-in-game.service";

import { YoutubeService } from "src/youtube/services/youtube.service";

import { HowLongToBeatService } from "src/how-long-to-beat/how-long-to-beat.service";
import { RawgApiGamesService } from "src/rawg/rawg-api/rawg-api-games/rawg-api-games.service";
import { HowLongToBeatResponseDto } from "src/how-long-to-beat/dto/how-long-to-beat-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class GamesUpdateService {
  private readonly logger = new Logger(GamesUpdateService.name);

  constructor(
    private readonly rawgApiGamesService: RawgApiGamesService,
    private readonly youtubeService: YoutubeService,
    private readonly steamReviewsService: SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
    private readonly hltbService: HowLongToBeatService,
    private readonly gamesRepository: GamesRepository,
  ) { }

  async updateGames() {
    this.logger.log('Scheduled update of games in db');
    const gamesInDb    = await this.gamesRepository.getRecentGames();
    console.log('length of games in db', gamesInDb.length);
    console.log(gamesInDb.map(game => game.rawgGame.name));
    // const updatedGames = await Promise.all(gamesInDb.map((game) => this.updateGame(game)));
    // this.gamesRepository.updateGames(updatedGames);
  }

  // function only for testing 
  // remember to delete it before merge to dev
  async updateGameById(gameId: number) {
    const gameInDb    = await this.gamesRepository.findGame(gameId);
    const updatedGame = await this.updateGame(gameInDb);
    console.log(updatedGame);
    this.gamesRepository.updateGames([updatedGame]);
  }

  private async updateGame(game: Game): Promise<Game> {
    // const updatedYotube       = await this.updateYoutubeTrailersAndReviews(game);
    const updatedSteamReviews = await this.updateSteamReviewsAndPlayerCount(game);
    const updatedHltb         = game.howLongToBeat ? game.howLongToBeat : await this.hltbUpdate(game);

    return {
      ...game,
      howLongToBeat:         updatedHltb,
      // video_reviews:         updatedYotube?.video_reviews,
      // game_trailers:         updatedYotube?.game_trailers,
      steam_reviews:         updatedSteamReviews?.steam_reviews,
      steam_players_in_game: updatedSteamReviews?.steam_players_count,
    }
  }

  private async updateYoutubeTrailersAndReviews(game: Game) {
    try{
      const game_trailers = await this.youtubeService.getGameTrailersByGameId(game._id);
      const video_reviews = await this.youtubeService.getGameVideoReviewByGameId(game._id);
      
      return {
        game_trailers: game_trailers.video_trailers,
        video_reviews: video_reviews.video_reviews
      }
    } catch (err) {
      this.logger.error(`Error while updating youtube trailers and reviews for ${game._id} ${game.rawgGame.name} ${err}`)
    }
  }

  private async updateSteamReviewsAndPlayerCount(game: Game) {
    try {
      if (!this.checkIfGameIsOnSteam(game)) {
        this.logger.log(`Game ${game._id} ${game.rawgGame.name} is not on steam`);
        return;
      }
      const steamReviews      = await this.steamReviewsService.getSteamReviewByGameId(game._id);
      const steamPlayersCount = await this.steamPlayersInGameService.getSteamPlayersCountByGameId(game._id);

      return {
        steam_reviews: steamReviews,
        steam_players_count: steamPlayersCount
      }
    } catch (err) {
      this.logger.error(`Error while updating steam reviews and player count for ${game._id} ${game.rawgGame.name} ${err}`);
    }
  }

  private async hltbUpdate(game: Game): Promise<HowLongToBeatResponseDto> {
    try {
      const hltbGame = await this.hltbService.getGameByName(game.rawgGame.name);

      return hltbGame;
    } catch (err) {
      this.logger.error(`Error while updating hltb for ${game._id} ${game.rawgGame.name} ${err}`);
    }
  }

  private checkIfGameIsOnSteam(game: Game) {
    return game.rawgGame.stores.includes('Steam');
  }
}