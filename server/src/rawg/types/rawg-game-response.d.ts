export interface RawgGameResponse {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms?: MetacriticPlatformsEntity[] | null;
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings?: RatingsEntity[] | null;
  reactions: Reactions;
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names?: null[] | null;
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game?: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms?: ParentPlatformsEntity[] | null;
  platforms?: PlatformsEntity[] | null;
  stores?: StoresEntity[] | null;
  developers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  genres?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  tags?: TagsEntity[] | null;
  publishers?: DevelopersEntityOrGenresEntityOrPublishersEntity[] | null;
  esrb_rating: PlatformOrEsrbRating;
}
export interface MetacriticPlatformsEntity {
  metascore: number;
  url: string;
  platform: Platform;
}
export interface Platform {
  platform: number;
  name: string;
  slug: string;
}
export interface RatingsEntity {
  id: number;
  title: string;
  count: number;
  percent: number;
}
export interface Reactions {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  10: number;
  11: number;
  12: number;
  14: number;
  15: number;
  16: number;
  21: number;
}
export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}
export interface ParentPlatformsEntity {
  platform: PlatformOrEsrbRating;
}
export interface PlatformOrEsrbRating {
  id: number;
  name: string;
  slug: string;
}
export interface PlatformsEntity {
  platform: Platform1;
  released_at: string;
  requirements: Requirements;
}
export interface Platform1 {
  id: number;
  name: string;
  slug: string;
  image?: null;
  year_end?: null;
  year_start?: number | null;
  games_count: number;
  image_background: string;
}
export interface Requirements {}
export interface StoresEntity {
  id: number;
  url: string;
  store: Store;
}
export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}
export interface DevelopersEntityOrGenresEntityOrPublishersEntity {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
export interface TagsEntity {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}
