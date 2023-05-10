export type Gamecard = {
  id: number;
  image: any;
  title: string;
  rating: number;
};

export type Children = ReactNode;

export type GamesResponse = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  results: Data[];
};

export type Data = {
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

type GamesByIdResponse = {
  game_id: number;
};
