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

export class GetGameQueryParamsDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page_size: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  stores: string;

  @IsOptional()
  @IsInt()
  metacritic: number;

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
  ])
  ordering: [
    'name',
    'released',
    'added',
    'created',
    'updated',
    'rating',
    'metacritic',
  ];
}
