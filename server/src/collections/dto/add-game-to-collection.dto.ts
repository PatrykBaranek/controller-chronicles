import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AddGameToCollectionDto {
  @IsNotEmpty()
  @IsInt()
  @IsNumber()
  gameId: number;
}
