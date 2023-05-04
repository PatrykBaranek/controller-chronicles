import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class GetGameVideoReviewDto {
  @ApiProperty({
    description: 'Language of the video review',
    required: false,
    enum: ['pl', 'en'],
  })
  @IsOptional()
  @IsIn(['pl', 'en'])
  lang?: 'pl' | 'en';
}
