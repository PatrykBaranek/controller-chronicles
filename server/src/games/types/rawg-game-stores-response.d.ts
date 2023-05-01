export interface GetGameStoresResponse {
  count: number;
  next: string;
  previous?: null;
  results: {
    id: number;
    game_id: number;
    store_id: number;
    url: string;
  }[];
}
