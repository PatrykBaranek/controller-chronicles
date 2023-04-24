import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUppercase,
  MaxLength,
} from 'class-validator';

export class FindEpisodeByGameDto {
  @IsNotEmpty()
  @IsString()
  gameTitle: string;

  @IsNumber()
  limit: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  language: string;

  @IsUppercase()
  @IsNotEmpty()
  @MaxLength(2)
  market: string;
}
