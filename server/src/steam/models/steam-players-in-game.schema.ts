import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ autoCreate: false, timestamps: true })
export class SteamPlayersInGame {
    @Prop()
    game_id: number;

    @Prop()
    playersCount: number;
}

export type SteamPlayersInGameDocument = SteamPlayersInGame & Document;
export const SteamPlayersInGameSchema = SchemaFactory.createForClass(SteamPlayersInGame);