import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUppercase,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindEpisodeByGameDto {
  @ApiProperty({ description: 'The game title', type: String })
  @IsNotEmpty()
  @IsString()
  gameTitle: string;

  @ApiProperty({
    description: 'The limit of results',
    minimum: 10,
    type: Number,
  })
  @IsNumber()
  limit: number;

  @ApiProperty({
    description: 'The language code',
    maxLength: 2,
    enum: ['pl', 'en'],
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  language: string;

  @ApiProperty({
    description: 'The market code',
    maxLength: 2,
    enum: ['PL', 'EN'],
  })
  @IsUppercase()
  @IsNotEmpty()
  @MaxLength(2)
  market: string;
}
