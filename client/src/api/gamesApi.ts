import { dateFormat } from '#/components/FilterDrawer/FilterDrawer.utils';
import {
  AuthResponse,
  BestsellerResponse,
  GameDetailsResponse,
  GamesResponse,
  PlayersCountResponse,
  SignUpResponse,
  SteamReviewsResponse,
  UserInputs,
  UserProfile,
  YoutubeResponse,
} from '#/types/types';
import axios from 'axios';
import dayjs from 'dayjs';
import { createRefresh } from 'react-auth-kit';

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

export const getUserProfile = async (authToken: string): Promise<UserProfile> => {
  try {
    const response = gamesApi.get('/users/profile', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${authToken}`,
      },
    });
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const refreshToken = createRefresh({
  interval: 13,
  // @ts-ignore
  refreshApiCallback: async ({ refreshToken }) => {
    try {
      const response = await gamesApi.get('/auth/refresh', {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: response.data.access_token_expires_in,
        newRefreshTokenExpiresIn: response.data.refresh_token_expires_in,
        newRefreshToken: response.data.refresh_token,
        newAuthUserState: {},
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

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

export const getSteamReviews = async (
  id: string | number | undefined
): Promise<SteamReviewsResponse> => {
  const response = await gamesApi.get(`/steam/${id}/reviews`);

  return response.data;
};

export const getSteamPlayersCount = async (
  id: string | number | undefined
): Promise<PlayersCountResponse> => {
  const response = await gamesApi.get(`/steam/${id}/players-count`);

  return response.data;
};
