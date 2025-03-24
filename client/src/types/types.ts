import React from "react";

export type Gamecard = {
  id: number | string;
  image: any;
  title: string;
  rating?: number;
  description?: string;
  isPodcastCard?: boolean;
  totalEpisodes?: number;
};

export type Children = {
  children: React.ReactNode,
};

export type UserInputs = { email: string; password: string };

export type SignUpResponse = {
  email: string;
  password: string;
  refreshToken: string;
};

export type PodcastResponse = {
  items: Podcast[];
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
};

export type Podcast = {
  copyrights: [];
  description: string;
  explicit: boolean;
  external_urls: Record<string, string>;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: string;
  episodes: EpisodesResponse;
};

export type EpisodesResponse = {
  items: Episode[];
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  href: string;
};

export type Episode = {
  description: string;
  audio_preview_url: string;
  duration_ms: number;
  explicit: string;
  external_urls: Record<string, string>;
  href: string;
  html_description: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_externally_hosted: boolean;
  languages: string[];
  name: string;
  type: string;
  language: string;
  is_playable: boolean;
  release_date: string;
  release_date_precision: string;
  uri: string;
  show: Show;
};

export type Soundtrack = {
  album_type: string;
  artists: {
    external_urls: Record<string, string>;
    href: string;
    id: string;
    name: string;
  };
  external_urls: Record<string, string>;
  available_markets: string[];
  href: string;
  id: string;
  name: string;
  release_date: string;
  type: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
};

export type UserPodcasts = Omit<PodcastResponse, 'items'> & {
  items: {
    show: Show;
  }[];
};

export type Show = {
  available_markets: string[];
  copyrights: [];
  description: string;
  explicit: boolean;
  external_urls: Record<string, string>;
  href: string;
  html_description: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  total_episodes: number;
  type: string;
  uri: string;
};

export type CollectionResponse = {
  createdAt: string;
  games: GameDetailsResponse[];
  name: string;
  priority: number;
  userId: string;
  __v: number;
  _id: string;
};

export type ReviewsSites = {
  title: string;
  url: string;
  source: string;
}[];

export type AuthResponse = {
  access_token: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};

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

export type UserProfile = {
  email: string;
  id: string;
};

export type BestsellerResponse = {
  games: Bestseller[];
};
export type GamesResponse = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  results: Games[];
};

export type YoutubeVideo = {
  title: string;
  thumbnail: string;
  author: string;
  link: string;
};
export type YoutubeResponse = YoutubeVideo[];

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
  description_raw?: string;
};

export type GameDetailsResponse = {
  rawgGame: RawgGameDetails;
  howLongToBeat: HLTB;
  video_reviews: YoutubeVideo[];
  game_trailers: YoutubeVideo[];
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

export type PlayersCountResponse = {
  playersCount: number;
  updatedAt: string;
};

export type SteamReviewsResponse = {
  reviewsSummaryFrom30Days: ReviewsSummary;
  reviewsSummaryOverall: ReviewsSummary;
};

type ReviewsSummary = {
  usersCount: number;
  textSummary: string;
  positivePercentage: number;
};
