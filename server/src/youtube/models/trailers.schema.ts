// src/games/models/GameTrailers.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SearchResultDto } from '../dto/search-result.dto';

export type GameTrailersDocument = GameTrailers & Document;

@Schema({ collection: 'game_trailers', autoCreate: false })
export class GameTrailers {

  @Prop([SearchResultDto])
  video_trailers: SearchResultDto[];

}

export const GameTrailersSchema = SchemaFactory.createForClass(GameTrailers);
