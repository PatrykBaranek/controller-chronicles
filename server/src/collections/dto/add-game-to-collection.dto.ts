import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddGameToCollectionDto {
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  gameId: number;

  @IsNotEmpty()
  @IsString()
  collectionId: string;
}
