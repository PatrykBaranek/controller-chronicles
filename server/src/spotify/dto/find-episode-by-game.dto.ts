import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindEpisodeByGameQueryParamsDto {
  @ApiProperty({
    description: 'The language code',
    maxLength: 2,
    enum: ['pl', 'en'],
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  language: string;
}
