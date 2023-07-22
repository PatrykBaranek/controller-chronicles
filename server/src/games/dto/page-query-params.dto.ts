import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PageQueryParamsDto {
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
}
