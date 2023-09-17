import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class SteamPlayersInGame {
    @Prop()
    game_id: number;

    @Prop()
    playersCount: number;

    @Prop()
    updatedAt: Date;
}

export type SteamPlayersInGameDocument = SteamPlayersInGame & Document;
export const SteamPlayersInGameSchema = SchemaFactory.createForClass(SteamPlayersInGame);