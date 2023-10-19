import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class ReviewsSummary {
  @Prop()
  usersCount: number;

  @Prop()
  textSummary: string;

  @Prop()
  positivePercentage: number;
}

@Schema({ autoCreate: false, timestamps: true })
export class SteamReviews {
  @Prop()
  game_id: number;

  @Prop({ type: ReviewsSummary })
  reviewsSummaryFrom30Days: ReviewsSummary;

  @Prop({ type: ReviewsSummary })
  reviewsSummaryOverall: ReviewsSummary;
}

export type SteamReviewsDocument = SteamReviews & Document;
export const SteamReviewsSchema = SchemaFactory.createForClass(SteamReviews);
