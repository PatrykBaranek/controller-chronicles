import { IsIn, IsOptional } from 'class-validator';

export class GetGameVideoReviewDto {
  @IsOptional()
  @IsIn(['pl', 'en'])
  lang?: 'pl' | 'en';
}
