import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GameReviewsDocument = GameReviews & Document;

@Schema({ collection: 'game_video_reviews' })
export class GameReviews {
  @Prop()
  game_id: number;

  @Prop([{ title: String, thumbnail: String, author: String, link: String }])
  video_reviews: Array<{
    title: string;
    thumbnail: string;
    author: string;
    link: string;
  }>;
}

export const GameReviewsSchema = SchemaFactory.createForClass(GameReviews);
