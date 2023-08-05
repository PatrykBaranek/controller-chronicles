export type Gamecard = {
  id: number;
  image: any;
  title: string;
  rating: number;
};

export type Children = ReactNode;
export type UserInputs = { email: string; password: string };
export type SignUpResponse = {
  'email': string;
  'password': string;
  '_id': string;
  '__v': number;
};
export type AuthResponse = {
  access_token:string,
  message:string,
  statusCode:number
}
export type AuthError = {
  error: string;
  message: string;
  statusCode: number;
};

export type Bestseller = {
  img: string;
  link: string;
  name: string;
  price: string;
};

export type BestsellerResponse = Bestseller[];
export type GamesResponse = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  results: Games[];
};

export type Games = {
  id: number;
  slug: string;
  name: string;
  released: Date;
  background_image: string;
  ratings_count: number;
  metacritic: number;
  suggestions_count: number;
  updated: Date;
  platforms: PlatformElement[];
  genres: Genre[];
  stores: Store[];
  tags: Genre[];
  short_screenshots: ShortScreenshot[];
};

export type GameDetailsResponse = {
  game_id: number;
  rawgGame: RawgGameDetails;
  howLongToBeat: HLTB;
  __v: number;
  _id: string;
};
export type RawgGameDetails = Omit<Games, 'short_Screenshots'> & {
  name_original: string;
  metacritic_platforms: string[];
  background_image_additional: string;
  website: string;
  screenshots_count: number;
  creators_count: number;
  achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  ratings_count: number;
  metacritic_url: string;
  additions_count: number;
  game_series_count: number;
  community_rating: number;
  developers: Developer[];
  publishers: Developer[];
  description_raw: string;
};
export type Developer = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};
export type HLTB = {
  gameplayCompletionist: number;
  gameplayMain: number;
  gameplayMainExtra: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  domain?: string;
  language?: string;
};

export type PlatformElement = {
  platform: PlatformPlatform;
  released_at: Date;
  requirements_en: RequirementsEn | null;
  requirements_ru: null;
};

export type PlatformPlatform = {
  id: number;
  name: string;
  slug: string;
  image: null;
  year_end: null;
  year_start: number | null;
  games_count: number;
  image_background: string;
};

export type RequirementsEn = {
  minimum: string;
  recommended: string;
};

export type ShortScreenshot = {
  id: number;
  image: string;
};

export type Store = {
  id: number;
  store: Genre;
};
