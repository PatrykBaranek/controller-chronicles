import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageQueryParamsDto } from './page-query-params.dto';

const Ordering = [
  'name',
  'released',
  'added',
  'created',
  'updated',
  'rating',
  'metacritic',
  '-name',
  '-released',
  '-added',
  '-created',
  '-updated',
  '-rating',
  '-metacritic',
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
    description: 'Search exact term',
    required: false,
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsString()
  search_exact?: string;

  @ApiProperty({
    description: 'Filter by genres',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  genres?: string;

  @ApiProperty({
    description: 'Filter by platforms',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  platforms?: string;

  @ApiProperty({
    description: 'Filter by stores',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  stores?: string;

  @ApiProperty({
    description: 'Filter by publishers',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  publishers?: string;

  @ApiProperty({
    description: 'Filter by Metacritic score',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  metacritic?: string;

  @ApiProperty({
    description: 'Filter by tags',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiProperty({
    description: 'Filter by release dates',
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
