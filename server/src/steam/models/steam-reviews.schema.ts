import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'steam_reviews' })
export class SteamReviews {
  @Prop()
  game_id: number;

  @Prop({
    type: {
      userCount: Number,
      textSummary: String,
    },
  })
  reviewsSummaryFrom30Days: {
    usersCount: number;
    textSummary: string;
  };

  @Prop({
    type: {
      userCount: Number,
      textSummary: String,
    },
  })
  reviewsSummaryOverall: {
    usersCount: number;
    textSummary: string;
  };

  @Prop()
  updatedAt: Date;
}

export type SteamReviewsDocument = SteamReviews & Document;
export const SteamReviewsSchema = SchemaFactory.createForClass(SteamReviews);
