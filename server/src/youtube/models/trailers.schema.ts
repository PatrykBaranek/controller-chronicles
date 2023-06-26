// src/games/models/GameTrailers.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SearchResultDto } from '../dto/search-result.dto';

export type GameTrailersDocument = GameTrailers & Document;

@Schema({ collection: 'game_trailers' })
export class GameTrailers {
  @Prop()
  game_id: number;

  @Prop([SearchResultDto])
  video_trailers: SearchResultDto[];
}

export const GameTrailersSchema = SchemaFactory.createForClass(GameTrailers);
