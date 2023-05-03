// src/games/models/GameTrailers.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GameTrailersDocument = GameTrailers & Document;

@Schema({ collection: 'game_trailers' })
export class GameTrailers {
  @Prop()
  game_id: number;

  @Prop([{ title: String, thumbnail: String, author: String, link: String }])
  trailers: Array<{
    title: string;
    thumbnail: string;
    author: string;
    link: string;
  }>;
}

export const GameTrailersSchema = SchemaFactory.createForClass(GameTrailers);
