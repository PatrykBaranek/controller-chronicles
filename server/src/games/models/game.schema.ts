import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

import { ReviewsSites } from 'src/reviews-sites/models/reviews-sites.schema';

import { SteamPlayersInGame } from 'src/steam/models/steam-players-in-game.schema';
import { SteamReviews } from 'src/steam/models/steam-reviews.schema';

import { YoutubeVideo } from 'src/youtube/models/youtube-video.schema';

export class IgdbGame {
  @Prop()
  slug: string;

  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop()
  aggregatedRating?: number;

  @Prop({ type: Date })
  firstReleaseDate?: Date;

  @Prop()
  background_image?: string;

  @Prop({ type: Array })
  screenshots?: string[] | null;

  @Prop({ type: Array })
  websites?: any[] | null;

  @Prop({ type: Array })
  platforms?: any[] | null;

  @Prop({ type: Array })
  developers?: any[] | null;

  @Prop({ type: Array })
  genres?: any[] | null;

  @Prop({ type: Array })
  publishers?: any[] | null;
}

@Schema({ collection: 'games', timestamps: true })
export class Game {
  @Prop()
  _id: number;

  @Prop({ type: IgdbGame })
  igdbGame: IgdbGame;

  @Prop({
    type: HowLongToBeat,
  })
  howLongToBeat?: HowLongToBeat;

  @Prop({
    type: SteamReviews,
  })
  steam_reviews?: SteamReviews;

  @Prop({
    type: SteamPlayersInGame,
  })
  steam_players_in_game?: SteamPlayersInGame;

  @Prop({
    type: Array<YoutubeVideo>,
  })
  video_reviews?: YoutubeVideo[];

  @Prop({
    type: Array<YoutubeVideo>,
  })
  game_trailers?: YoutubeVideo[];

  @Prop({
    type: Date,
  })
  review_embargo_date?: Date;

  @Prop({
    type: Array<ReviewsSites>,
  })
  reviews_sites?: ReviewsSites[];

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
