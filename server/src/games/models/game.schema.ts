import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HowLongToBeat } from 'src/how-long-to-beat/models/hltb.schema';
import { SteamPlayersInGame } from 'src/steam/models/steam-players-in-game.schema';
import { SteamReviews } from 'src/steam/models/steam-reviews.schema';
import { SearchResultDto } from 'src/youtube/dto/search-result.dto';

class RawgGame {
  @Prop()
  slug: string;

  @Prop()
  name: string;

  @Prop()
  name_original: string;

  @Prop()
  description: string;

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
  reddit_count: number;

  @Prop()
  twitch_count: number;

  @Prop()
  youtube_count: number;

  @Prop()
  ratings_count: number;

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

@Schema({ collection: 'games' })
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
    type: SteamReviews,
  })
  steamReviews?: SteamReviews;

  @Prop({
    type: SteamPlayersInGame,
  })
  steamPlayersInGame?: SteamPlayersInGame;

  @Prop([SearchResultDto])
  video_reviews?: SearchResultDto[];

  @Prop([SearchResultDto])
  game_trailers?: SearchResultDto[];
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
