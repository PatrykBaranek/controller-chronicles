import { AuthError, AuthResponse, SignUpResponse } from '#/types/types';
import {
  UserInputs,
  type BestsellerResponse,
  type GameDetailsResponse,
  type GamesResponse,
} from '#/types/types';
import getNextMonthFromNow from '#/utils/getNextMonthFromNow';
import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'localhost:3000',
});

export const getBestsellers = async (): Promise<BestsellerResponse> => {
  const response = await gamesApi.get('/games/steam/bestsellers');
  return response.data;
};

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

export const getNewReleasedGames = async (
  currentDate: Date
): Promise<GamesResponse> => {
  const current = currentDate.toISOString().slice(0, 10);
  const nextMonth = getNextMonthFromNow(currentDate);
  const response = await gamesApi.get(
    `/games?page=1&page_size=5&dates=${current},${nextMonth}`
  );
  return response.data;
};

export const signUpUser = async ({
  email,
  password,
}: UserInputs): Promise<SignUpResponse> => {
  try {
    const response = gamesApi.post(
      '/auth/signup',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const logInUser = async ({
  email,
  password,
}: UserInputs): Promise<AuthResponse> => {
  try {
    const response = gamesApi.post(
      '/auth/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};
