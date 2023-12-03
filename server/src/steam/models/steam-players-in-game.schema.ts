import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ autoCreate: false, timestamps: true })
export class SteamPlayersInGame {
  @Prop()
  playersCount: number;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdAt: Date;
}

export type SteamPlayersInGameDocument = SteamPlayersInGame & Document;
export const SteamPlayersInGameSchema = SchemaFactory.createForClass(SteamPlayersInGame);