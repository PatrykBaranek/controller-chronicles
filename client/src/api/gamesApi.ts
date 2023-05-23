import { GameDetailsResponse, GamesResponse } from '#/types/types';
import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getGames = async (
  page = 1,
  pageSize = 8
): Promise<GamesResponse> => {
  const response = await gamesApi.get(
    `/games?page=${page}&page_size=${pageSize}`
  );

  return response.data;
};
export const getGameById = async (
  id: number | undefined
): Promise<GameDetailsResponse> => {
  const response = await gamesApi.get(`/games/${id}`);

  return response.data;
};
export const getGamesBySearchQuery = async (
  query = ''
): Promise<GamesResponse> => {
  const response = await gamesApi.get(
    `/games?page=1&page_size=8&search=${query}`
  );

  return response.data;
};
