import { Injectable } from "@nestjs/common";
import { ReviewsSitesEurogamerService } from "../reviews-sites-eurogamer/reviews-sites-eurogamer.service";
import { ReviewsSitesGamesradarService as ReviewsSitesGamesradarService } from "../reviews-sites-gameradar/reviews-sites-gamesradar.service";

@Injectable()
export class ReviewsSitesConnectorService {
  constructor(
    private readonly eurogamerService: ReviewsSitesEurogamerService,
    private readonly gamesradarService: ReviewsSitesGamesradarService
  ) { }
}