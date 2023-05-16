import { Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetGameQueryParamsDto {
  @ApiProperty({
    description: 'The page number to fetch',
    minimum: 1,
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    description: 'The number of results per page',
    minimum: 1,
    default: 5,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(5)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page_size: number;

  @ApiProperty({ description: 'Search term', required: false, type: String })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    description: 'Filter by stores',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  stores: string;

  @ApiProperty({
    description: 'Filter by Metacritic score',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  metacritic: string;

  @ApiProperty({
    description: 'Filter by tags',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  tags: string;

  @ApiProperty({
    description: 'Order results by specific field',
    required: false,
    enum: [
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
    ],
  })
  @IsOptional()
  @IsString()
  @IsIn([
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
  ])
  ordering: [
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
}
