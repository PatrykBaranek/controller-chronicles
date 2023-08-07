import { Controller, Get, Param } from '@nestjs/common';
import { ReviewsSitesGameradarService } from './reviews-sites-gameradar/reviews-sites-gameradar.service';
import { ReviewsSitesEurogamerService } from './reviews-sites-eurogamer/reviews-sites-eurogamer.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api/reviews-sites')
@Controller('api/reviews-sites')
export class ReviewsSitesController {
  constructor(
    private readonly gameradarService: ReviewsSitesGameradarService,
    private readonly eurogamerService: ReviewsSitesEurogamerService,
  ) {}

  @Get('gamesradar/:id')
  async getGameReviewByIdFromGameradar(@Param('id') id: number) {
    return this.gameradarService.getGameReviewById(id);
  }

  @Get('eurogamer/:id')
  async getGameReviewByIdFromEurogamer(@Param('id') id: number) {
    return this.eurogamerService.getGameReviewById(id);
  }

  @Get(':gameId')
  async getGameReviewById(@Param('gameId') gameId: number) {
    return await Promise.all([
      ...(await this.gameradarService.getGameReviewById(gameId)),
      ...(await this.eurogamerService.getGameReviewById(gameId)),
    ]);
  }
}
