import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetGameDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  page_size?: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  stores?: string;

  @IsOptional()
  @IsNumber()
  metacritic?: number;

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
  ordering?: [
    'name',
    'released',
    'added',
    'created',
    'updated',
    'rating',
    'metacritic',
  ];
}
