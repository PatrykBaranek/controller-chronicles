import { dateFormat } from '#/components/FilterDrawer/FilterDrawer.utils';
import {
  AuthResponse,
  BestsellerResponse,
  GameDetailsResponse,
  GamesResponse,
  SignUpResponse,
  UserInputs,
  YoutubeResponse,
} from '#/types/types';
import axios from 'axios';
import dayjs from 'dayjs';

const gamesApi = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getBestsellers = async (): Promise<BestsellerResponse> => {
  const response = await gamesApi.get('/steam/bestsellers');
  return response.data;
};

export const getGames = async (page = 1, pageSize = 8): Promise<GamesResponse> => {
  const response = await gamesApi.get(`/games?page=${page}&page_size=${pageSize}`);

  return response.data;
};
export const getGameById = async (
  id: number | undefined | string
): Promise<GameDetailsResponse> => {
  const response = await gamesApi.get(`/games/${id}`);

  return response.data;
};
export const getGamesBySearchQuery = async (query = ''): Promise<GamesResponse> => {
  const response = await gamesApi.get(`/games?page=1&page_size=8&search=${query}`);

  return response.data;
};
export const getFilteredGames = async (query: string): Promise<GamesResponse> => {
  const response = await gamesApi.get(`/games?page=1&page_size=8&${query}`);

  return response.data;
};

export const getNewReleasedGames = async (): Promise<GamesResponse> => {
  const current = dayjs().format(dateFormat);
  const nextMonth = dayjs().add(1, 'month').format(dateFormat);
  const response = await gamesApi.get(`/games?page=1&page_size=5&dates=${current},${nextMonth}`);
  return response.data;
};

export const signUpUser = async ({ email, password }: UserInputs): Promise<SignUpResponse> => {
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

export const logInUser = async ({ email, password }: UserInputs): Promise<AuthResponse> => {
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

export const getNewestYoutubeVideos = async (
  videoType: 'review' | 'trailer'
): Promise<YoutubeResponse> => {
  let to;
  let from;
  if (videoType === 'review') {
    from = dayjs().subtract(1, 'month').format(dateFormat);
    to = dayjs().format(dateFormat);
  } else {
    to = dayjs().add(1, 'month').format(dateFormat);
    from = dayjs().format(dateFormat);
  }
  try {
    const response = await gamesApi.get(
      `/youtube/videos/date-range?fromDate=${from}&toDate=${to}&videoType=${videoType}&gamesCount=5`
    );

    return await response.data;
  } catch (error: any) {
    throw error.response?.data;
  }
};
