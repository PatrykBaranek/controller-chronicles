import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';

import { ReviewsSites } from 'src/reviews-sites/models/reviews-sites.schema';
import { SteamReviewsDto } from 'src/steam/dto/steam-reviews.dto';

import { SteamPlayersInGame } from 'src/steam/models/steam-players-in-game.schema';

import { SearchResultDto } from 'src/youtube/dto/search-result.dto';

class RawgGame {
  @Prop()
  slug: string;

  @Prop()
  name: string;

  @Prop()
  name_original: string;

  @Prop()
  description_raw: string;

  @Prop()
  metacritic: number;

  @Prop({ type: Array })
  metacritic_platforms?: any[] | null;

  @Prop()
  released: string;

  @Prop()
  updated: string;

  @Prop()
  background_image: string;

  @Prop()
  background_image_additional: string;

  @Prop()
  website: string;

  @Prop()
  screenshots_count: number;

  @Prop()
  movies_count: number;

  @Prop()
  creators_count: number;

  @Prop()
  achievements_count: number;

  @Prop()
  parent_achievements_count: number;

  @Prop()
  reddit_url: string;

  @Prop()
  reddit_name: string;

  @Prop()
  reddit_description: string;

  @Prop()
  reddit_logo: string;

  @Prop()
  suggestions_count: number;

  @Prop({ type: Array })
  alternative_names?: null[] | null;

  @Prop()
  metacritic_url: string;

  @Prop()
  parents_count: number;

  @Prop()
  additions_count: number;

  @Prop()
  game_series_count: number;

  @Prop({ type: Array })
  platforms?: any[] | null;

  @Prop({ type: Array })
  stores?: any[] | null;

  @Prop({ type: Array })
  developers?: any[] | null;

  @Prop({ type: Array })
  genres?: any[] | null;

  @Prop({ type: Array })
  tags?: any[] | null;

  @Prop({ type: Array })
  publishers?: any[] | null;
}

@Schema({ collection: 'games', timestamps: true })
export class Game {
  @Prop()
  _id: number;

  @Prop({ type: RawgGame })
  rawgGame: RawgGame;

  @Prop({
    type: HowLongToBeat,
  })
  howLongToBeat?: HowLongToBeat;

  @Prop({
    type: SteamReviewsDto,
  })
  steam_reviews?: SteamReviewsDto;

  @Prop({
    type: SteamPlayersInGame,
  })
  steam_players_in_game?: SteamPlayersInGame;

  @Prop({
    type: Array<SearchResultDto>
  })
  video_reviews?: SearchResultDto[];

  @Prop({
    type: Array<SearchResultDto>
  })
  game_trailers?: SearchResultDto[];

  @Prop({
    type: Date,
  })
  review_embargo_date?: Date;

  @Prop({
    type: Array<ReviewsSites>
  })
  reviews_sites?: ReviewsSites[];

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
