import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  AddedByStatus,
  DevelopersEntityOrGenresEntityOrPublishersEntity,
  MetacriticPlatformsEntity,
  ParentPlatformsEntity,
  PlatformOrEsrbRating,
  PlatformsEntity,
  RatingsEntity,
  RawgGameResponse,
  Reactions,
  StoresEntity,
  TagsEntity,
} from 'src/rawg/types/rawg-game-response';

export class RawgGameSingleResponseDto implements RawgGameResponse {
  @ApiProperty({ description: 'Game name' })
  name: string;

  @ApiProperty({ description: 'Raw description text' })
  description_raw: string;

  @ApiProperty({ description: 'Metacritic score' })
  metacritic: number;

  @ApiProperty({ description: 'Metacritic page URL' })
  metacritic_url: string;

  @ApiProperty({
    description: 'Metacritic scores per platform',
    required: false,
  })
  metacritic_platforms?: MetacriticPlatformsEntity[] | null;

  @ApiProperty({ description: 'Release date', type: String })
  @Type(() => Date)
  released: string;

  @ApiProperty({ description: 'Last updated date', type: String })
  @Type(() => Date)
  updated: string;

  @ApiProperty({ description: 'Background image URL' })
  background_image: string;

  @ApiProperty({ description: 'Additional background image URL' })
  background_image_additional: string;

  @ApiProperty({ description: 'Game website URL' })
  website: string;

  @ApiProperty({ description: 'Game developers', required: false })
  developers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;

  @ApiProperty({ description: 'Game publishers', required: false })
  publishers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;

  @ApiProperty({ description: 'Supported platforms', required: false })
  platforms?: PlatformsEntity[] | null;

  @ApiProperty({ description: 'Stores the game is available on', required: false })
  stores?: StoresEntity[] | null;

  @ApiProperty({ description: 'Game genres', required: false })
  genres?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;

  @ApiProperty({ description: 'Game tags', required: false })
  tags?: TagsEntity[] | null;

  @ApiProperty({ description: 'Reddit page URL' })
  reddit_url: string;

  @ApiProperty({ description: 'Number of Reddit mentions' })
  reddit_count: number;

  @ApiProperty({ description: 'Number of games in the series' })
  game_series_count: number;

  @ApiProperty({ description: 'Number of creators' })
  creators_count: number;

  @ApiProperty({ description: 'Number of achievements' })
  achievements_count: number;

  @ApiProperty({ description: 'Number of Twitch streams' })
  twitch_count: number;

  @ApiProperty({ description: 'Number of YouTube videos' })
  youtube_count: number;

  @ApiProperty({ description: 'Number of ratings' })
  ratings_count: number;

  @ApiProperty({ description: 'Number of suggested games' })
  suggestions_count: number;

  @ApiProperty({ description: 'Number of game additions/DLCs' })
  additions_count: number;

  @ApiProperty({ description: 'Number of screenshots' })
  screenshots_count: number;

  @Exclude()
  id: number;

  @Exclude()
  slug: string;

  @Exclude()
  name_original: string;

  @Exclude()
  reddit_name: string;

  @Exclude()
  reddit_description: string;

  @Exclude()
  parent_achievements_count: number;

  @Exclude()
  clip: string;

  @Exclude()
  reviews_text_count: number;

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
