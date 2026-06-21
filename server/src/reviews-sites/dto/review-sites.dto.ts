import { ApiProperty } from '@nestjs/swagger';

export class ReviewsSitesGameReviewsDto {
  @ApiProperty({ description: 'Name of the review site' })
  source: string;

  @ApiProperty({ description: 'Title of the review' })
  title: string;

  @ApiProperty({ description: 'URL of the review' })
  url: string;
}
