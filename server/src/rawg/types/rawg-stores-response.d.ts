export interface GetStoresResponse {
  count: number;
  next: string;
  previous?: null;
  results: {
    id: number;
    name: string;
    domain: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
  }[];
}
