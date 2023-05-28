import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ReviewsSummary {
  @Prop()
  usersCount: number;

  @Prop()
  textSummary: string;
}

const ReviewsSummarySchema = SchemaFactory.createForClass(ReviewsSummary);

@Schema({ collection: 'steam_reviews' })
export class SteamReviews {
  @Prop()
  game_id: number;

  @Prop({ type: ReviewsSummarySchema })
  reviewsSummaryFrom30Days: ReviewsSummary;

  @Prop({ type: ReviewsSummarySchema })
  reviewsSummaryOverall: ReviewsSummary;

  @Prop()
  updatedAt: Date;
}

export type SteamReviewsDocument = SteamReviews & Document;
export const SteamReviewsSchema = SchemaFactory.createForClass(SteamReviews);
