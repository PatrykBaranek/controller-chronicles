import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageQueryParamsDto } from './page-query-params.dto';

export class GetGameQueryParamsDto extends PageQueryParamsDto {
  @ApiProperty({ description: 'Search term', required: false, type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Filter by stores',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  stores?: string;

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
  ordering?: [
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
