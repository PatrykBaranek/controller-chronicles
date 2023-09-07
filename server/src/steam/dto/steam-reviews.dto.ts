import { ApiProperty } from "@nestjs/swagger";

export class SteamReviewsDto {
    @ApiProperty()
    reviewsSummaryFrom30Days?: {
        usersCount: number;
        textSummary: string;
        positivePercentage: number;
    };

    @ApiProperty()
    reviewsSummaryOverall?: {
        usersCount: number;
        textSummary: string;
        positivePercentage: number;
    };
}