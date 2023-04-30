import { Exclude, Expose, Type } from 'class-transformer';
import {
  MetacriticPlatformsEntity,
  RatingsEntity,
  Reactions,
  AddedByStatus,
  ParentPlatformsEntity,
  PlatformsEntity,
  StoresEntity,
  DevelopersEntityOrGenresEntityOrPublishersEntity,
  TagsEntity,
  PlatformOrEsrbRating,
  RawgGameResponse,
} from '../types/rawg-game-response';

export class RawgGameResponseDto implements RawgGameResponse {
  id: number;
  slug: string;
  name: string;
  name_original: string;

  @Expose({ name: 'description_text' })
  description_raw: string;

  metacritic: number;
  metacritic_url: string;
  metacritic_platforms?: MetacriticPlatformsEntity[] | null;

  @Type(() => Date)
  released: string;

  @Type(() => Date)
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  developers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  publishers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  platforms?: PlatformsEntity[] | null;
  stores?: StoresEntity[] | null;
  genres?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  tags?: TagsEntity[] | null;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_count: number;
  game_series_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  additions_count: number;
  screenshots_count: number;

  @Exclude()
  description: string;

  @Exclude()
  tba: boolean;

  @Exclude()
  rating: number;

  @Exclude()
  rating_top: number;

  @Exclude()
  ratings?: RatingsEntity[] | null;

  @Exclude()
  reactions: Reactions;

  @Exclude()
  added: number;

  @Exclude()
  added_by_status: AddedByStatus;

  @Exclude()
  playtime: number;

  @Exclude()
  movies_count: number;

  @Exclude()
  reddit_logo: string;

  @Exclude()
  alternative_names?: null[] | null;

  @Exclude()
  parents_count: number;

  @Exclude()
  user_game?: null;

  @Exclude()
  reviews_count: number;

  @Exclude()
  saturated_color: string;

  @Exclude()
  dominant_color: string;

  @Exclude()
  parent_platforms?: ParentPlatformsEntity[] | null;

  @Exclude()
  esrb_rating: PlatformOrEsrbRating;
}
