import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageQueryParamsDto } from './page-query-params.dto';

const Ordering = [
  'name',
  'released',
  'rating',
  'updated',
  '-name',
  '-released',
  '-rating',
  '-updated',
];

export class GetGameQueryParamsDto extends PageQueryParamsDto {
  @ApiProperty({
    description: 'Search term',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by genre IDs (comma-separated)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  genres?: string;

  @ApiProperty({
    description: 'Filter by platform IDs (comma-separated)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  platforms?: string;

  @ApiProperty({
    description: 'Filter by publisher/developer company IDs (comma-separated)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  publishers?: string;

  @ApiProperty({
    description: 'Minimum aggregated critic rating (0-100)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  metacritic?: string;

  @ApiProperty({
    description: 'Filter by release dates (ISO date range, comma-separated)',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  dates?: string;

  @ApiProperty({
    description: 'Order results by specific field',
    required: false,
    enum: Ordering,
  })
  @IsOptional()
  @IsString()
  @IsIn(Ordering)
  ordering?: typeof Ordering;
}
