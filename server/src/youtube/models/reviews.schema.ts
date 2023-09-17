import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SearchResultDto } from '../dto/search-result.dto';

export type GameReviewsDocument = GameReviews & Document;

@Schema({ collection: 'game_video_reviews', autoCreate: false })
export class GameReviews {

  @Prop([SearchResultDto])
  video_reviews: SearchResultDto[];

}

export const GameReviewsSchema = SchemaFactory.createForClass(GameReviews);
