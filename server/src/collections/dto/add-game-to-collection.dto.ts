import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddGameToCollectionDto {
  @ApiProperty({
    description: 'Game ID',
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  gameId: number;

  @ApiProperty({
    description: 'Collection ID',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  collectionId: string;
}
