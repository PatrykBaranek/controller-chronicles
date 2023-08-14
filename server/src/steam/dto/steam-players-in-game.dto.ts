import { ApiProperty } from "@nestjs/swagger";

export class SteamPlayersCountInGameDto {
    @ApiProperty()
    playersCount: number;

    @ApiProperty()
    updatedAt?: Date;
}