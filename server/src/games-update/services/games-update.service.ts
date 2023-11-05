import { Injectable, Logger } from "@nestjs/common";

import { GamesRepository }       from "../../games/database/games.repository";
import { Game }                  from "../../games/models/game.schema";
import { GamesUpdateRepository } from "../database/games-update.repository";

import { SteamReviewsService }       from "src/steam/services/steam-reviews/steam-reviews.service";
import { SteamPlayersInGameService } from "src/steam/services/steam-players-in-game/steam-players-in-game.service";

import { YoutubeService } from "src/youtube/services/youtube.service";
import { VideoType }      from "src/youtube/util/youtube-utility.service";

import { HowLongToBeatService }     from "src/how-long-to-beat/services/how-long-to-beat.service";
import { HowLongToBeatResponseDto } from "src/how-long-to-beat/dto/how-long-to-beat-response.dto";

import { RawgApiGamesService } from "src/rawg/rawg-api/rawg-api-games/rawg-api-games.service";
import { ReviewsSitesService } from "src/reviews-sites/reviews-sites.service";

@Injectable()
export class GamesUpdateService {
  private readonly logger = new Logger(GamesUpdateService.name);

  constructor(
    private readonly rawgApiGamesService:       RawgApiGamesService,
    private readonly youtubeService:            YoutubeService,
    private readonly steamReviewsService:       SteamReviewsService,
    private readonly steamPlayersInGameService: SteamPlayersInGameService,
    private readonly hltbService:               HowLongToBeatService,
    private readonly reviewsSitesService:       ReviewsSitesService,
    private readonly gamesUpdateRepository:     GamesUpdateRepository,
    private readonly gamesRepository:           GamesRepository,
  ) { }

  async updateGames() {
    this.logger.log('Scheduled update of games in db');
    const gamesInDb    = await this.gamesRepository.getRecentGames();
    const updatedGames = await Promise.all(gamesInDb.map((game) => this.updateGame(game)));
    this.gamesRepository.updateGames(updatedGames);
  }

  private async updateGame(game: Game): Promise<Game> {
    const [updatedRawgGame, updatedHltb, updatedSteamReviews, updatedReviewsSites, updateYoutube] = await Promise.all([
      this.rawgApiGamesService.getGameById(game._id),
      this.hltbUpdate(game),
      this.updateSteamReviewsAndPlayerCount(game),
      this.updateReviewsSites(game),
      this.updateYoutubeTrailersAndReviews(game),
    ]);

    game.rawgGame = updatedRawgGame;
    game.howLongToBeat = updatedHltb;
    game.steam_reviews = updatedSteamReviews?.steam_reviews;
    game.steam_players_in_game = updatedSteamReviews?.steam_players_count;
    game.reviews_sites = updatedReviewsSites;
    game.video_reviews = updateYoutube?.video_reviews;
    game.game_trailers = updateYoutube?.game_trailers;

    return game;
  }

  private async updateYoutubeTrailersAndReviews(game: Game) {
    try {
      if ((await this.gamesUpdateRepository.findGame(game._id)).update_youtube) {
        throw new Error(`Youtube update is disabled for ${game._id} ${game.rawgGame.name}`);
      }

      const game_trailers = await this.youtubeService.getGameVideosByGameId({ gameId: game._id, videoType: VideoType.TRAILER });
      const video_reviews = await this.youtubeService.getGameVideosByGameId({ gameId: game._id, videoType: VideoType.REVIEW });

      this.logger.warn(`Found ${game_trailers.length} trailers and ${video_reviews.length} reviews for ${game._id} ${game.rawgGame.name}`);

      if (game_trailers.length === 0 && video_reviews.length === 0) {
        throw new Error('No youtube trailers or reviews found');
      }

      return {
        game_trailers: game_trailers,
        video_reviews: video_reviews
      }
    } catch (err) {
      await this.handleGameUpdateError(game, 'youtube', err.message);
    }
  }

  private async updateSteamReviewsAndPlayerCount(game: Game) {
    try {
      const steamReviews      = await this.steamReviewsService.getSteamReviewByGameId(game._id);
      const steamPlayersCount = await this.steamPlayersInGameService.getSteamPlayersCountByGameId(game._id);

      return {
        steam_reviews: steamReviews,
        steam_players_count: steamPlayersCount
      }
    } catch (err) {
      await this.handleGameUpdateError(game, 'steam', err.message);
    }
  }

  private async hltbUpdate(game: Game): Promise<HowLongToBeatResponseDto> {
    try {
      if ((await this.gamesUpdateRepository.findGame(game._id)).update_hltb) {
        const hltbGame = await this.hltbService.getGameByName(game.rawgGame.name);

        return hltbGame;
      }
    } catch (err) {
      await this.handleGameUpdateError(game, 'hltb', err.message);
    }
  }

  private async updateReviewsSites(game: Game) {
    try {
      if (game.reviews_sites) {
        const reviewsSites = await this.reviewsSitesService.getReviews(game._id);

        return reviewsSites;
      }
    } catch (err) {
      await this.handleGameUpdateError(game, 'reviewsSites', err.message);
    }
  }

  private async handleGameUpdateError(game: Game, source: string, errorMessage: string) {
    const errorFieldMapping = {
      youtube: { field: 'update_youtube', errorMessagesField: 'youtubeErrorMessages' },
      steam: { field: 'update_steam', errorMessagesField: 'steamErrorMessages' },
      hltb: { field: 'update_hltb', errorMessagesField: 'hltbErrorMessages' },
      reviewsSites: { field: 'update_reviews', errorMessagesField: 'reviewsSitesErrorMessages' },
    };

    const { field, errorMessagesField } = errorFieldMapping[source];

    // await this.gamesUpdateRepository.addGameToTrash({ _id: game._id, name: game.rawgGame.name, [errorMessagesField]: [errorMessage], [field]: false });
    await this.gamesRepository.updateGame(game._id, { [field]: false });
    this.logger.error(`Error while updating ${source} for ${game._id} ${game.rawgGame.name} ${errorMessage}`);
  }
}