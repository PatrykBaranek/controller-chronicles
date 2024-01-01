import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class DefaultQueryParamsDto {
  @ApiProperty({
    description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50',
    minimum: 1,
    maximum: 50,
    default: 20,
  })
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @ApiProperty({
    description: 'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items',
    default: 0,
  })
  @IsNotEmpty()
  @IsNumberString()
  offset: number;
}