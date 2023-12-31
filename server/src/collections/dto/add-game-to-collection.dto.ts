import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

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
  @IsMongoId()
  collectionId: string;
}
