import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'steam_reviews' })
export class SteamReviews {
  @Prop()
  game_id: number;

  @Prop({
    type: {
      textSummary: String,
      userCount: String,
    },
  })
  reviewsSummaryFrom30Days: {
    usersCount: string;
    textSummary: string;
  };

  @Prop({
    type: {
      textSummary: String,
      userCount: String,
    },
  })
  reviewsSummaryOverall: {
    usersCount: string;
    textSummary: string;
  };

  @Prop()
  updatedAt: Date;
}

export type SteamReviewsDocument = SteamReviews & Document;
export const SteamReviewsSchema = SchemaFactory.createForClass(SteamReviews);
