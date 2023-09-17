import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class ReviewsSummary {
  @Prop()
  usersCount: number;

  @Prop()
  textSummary: string;

  @Prop()
  positivePercentage: number;
}

const ReviewsSummarySchema = SchemaFactory.createForClass(ReviewsSummary);

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
