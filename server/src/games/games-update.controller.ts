import { Controller, Get, Param } from "@nestjs/common";
import { GamesUpdateService } from "./services/games-update.service";

// Delete this controller before merge to dev
@Controller('api/games-update')
export class GamesUpdateController {

  constructor(private readonly gamesUpdateService: GamesUpdateService) { }

  @Get()
  async updateGames() {
    this.gamesUpdateService.updateGames();
  }

  @Get(':gameId')
  async updateGameById(@Param('gameId') gameId: number) {
    this.gamesUpdateService.updateGameById(gameId);
  }
}