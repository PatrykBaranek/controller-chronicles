import { Module } from "@nestjs/common";
import { ReviewsSitesConnectorService } from "./reviews-sites-connector.service";
import { ReviewsSitesEurogamerModule } from "../reviews-sites-eurogamer/reviews-sites-eurogamer.module";
import { ReviewsSitesGamesradarModule } from "../reviews-sites-gameradar/reviews-sites-gamesradar.module";


@Module({
    imports: [ReviewsSitesEurogamerModule, ReviewsSitesGamesradarModule],
    providers: [ReviewsSitesConnectorService]
})
export class ReviewsSitesConnectorModule {}