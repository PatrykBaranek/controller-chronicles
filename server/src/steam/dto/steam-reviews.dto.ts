import { ApiProperty } from '@nestjs/swagger';

class SteamReviewsSummaryDto {
  @ApiProperty({ description: 'Number of users who reviewed in this period' })
  usersCount: number;

  @ApiProperty({ description: 'Text summary of the review score' })
  textSummary: string;

  @ApiProperty({ description: 'Percentage of positive reviews' })
  positivePercentage: number;
}

export class SteamReviewsDto {
  @ApiProperty({
    description: 'Review summary for the last 30 days',
    required: false,
    type: SteamReviewsSummaryDto,
  })
  reviewsSummaryFrom30Days?: SteamReviewsSummaryDto;

  @ApiProperty({
    description: 'Overall review summary',
    required: false,
    type: SteamReviewsSummaryDto,
  })
  reviewsSummaryOverall?: SteamReviewsSummaryDto;
}
