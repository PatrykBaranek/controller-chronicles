import { dateFormat } from '#/components/FilterDrawer/FilterDrawer.utils';
import {
  AuthResponse,
  BestsellerResponse,
  CollectionResponse,
  Episode,
  GameDetailsResponse,
  GamesResponse,
  PlayersCountResponse,
  Podcast,
  PodcastResponse,
  ReviewsSites,
  SignUpResponse,
  Soundtrack,
  SteamReviewsResponse,
  UserInputs,
  UserPodcasts,
  UserProfile,
  YoutubeResponse,
} from '#/types/types';
import axios from 'axios';
import dayjs from 'dayjs';
import { createRefresh } from 'react-auth-kit';

const gamesApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
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

export const getReviewsSites = async (id: string): Promise<ReviewsSites> => {
  const response = await gamesApi.get(`/reviews-sites/${id}`);

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

export const deleteUserAccount = async (authToken: string, id: string): Promise<any> => {
  try {
    const response = gamesApi.delete(`/users/${id}`, {
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

export const requestPasswordChange = async (email: string): Promise<any> => {
  try {
    const response = gamesApi.post(`/auth/request-reset-password?email=${email}`);
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const resetPassword = async (
  token: string,
  password: string,
  repeatPassword: string
): Promise<any> => {
  try {
    const response = gamesApi.post(`/auth/reset-password?token=${token}`, {
      password,
      repeat_password: repeatPassword,
    });
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

export const getUserCollections = async (authToken: string): Promise<CollectionResponse[]> => {
  try {
    const response = gamesApi.get('/collections', {
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

export const deleteCollection = async (id: string, authToken: string) => {
  try {
    const response = gamesApi.delete(`/collections/${id}`, {
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

export const deleteGameFromCollection = async (
  collectionId: string,
  gameId: string | number,
  authToken: string
) => {
  try {
    const response = gamesApi.delete(`/collections/${collectionId}/game/${gameId}`, {
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

export const addGameToCollection = async (
  authToken: string,
  gameId: number,
  collectionId: string
) => {
  try {
    const response = gamesApi.post(
      '/collections/add-game',
      {
        gameId,
        collectionId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return (await response).data;
  } catch (error: any) {
    throw error.response?.data;
  }
};

type CollectionReqProps = {
  collectionName: string;
  priority?: number;
  authToken: string;
};

export const addCollection = async ({
  collectionName,
  priority = 0,
  authToken,
}: CollectionReqProps) => {
  try {
    const response = gamesApi.post(
      'collections',
      {
        name: collectionName,
        priority,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
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

export const getYoutubeVideosByGameId = async (
  videoType: 'review' | 'trailer',
  gameId: string
): Promise<YoutubeResponse> => {
  try {
    const response = await gamesApi.get(`/youtube?gameId=${gameId}&videoType=${videoType}`);

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

export const connectToSpotify = async (): Promise<{ url: string }> => {
  const response = await gamesApi.post('/spotify/auth/login', {
    withCredentials: true,
  });

  return response.data;
};

export const getAllPodcasts = async (page = 0): Promise<PodcastResponse> => {
  const response = await gamesApi.get(`/spotify/podcasts?limit=20&offset=${page}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getPodcastById = async (id: string): Promise<Podcast> => {
  const response = await gamesApi.get(`spotify/podcasts/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getEpisodesByGameId = async (id: string): Promise<Episode[]> => {
  const response = await gamesApi.get(`spotify/episodes/game/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getSoundtrackByGameId = async (id: string): Promise<Soundtrack[]> => {
  const response = await gamesApi.get(`spotify/soundtracks/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getEpisodeById = async (id: string): Promise<Episode> => {
  const response = await gamesApi.get(`spotify/episodes/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getUserPodcasts = async (): Promise<UserPodcasts> => {
  const response = await gamesApi.get('spotify/podcasts/user/list?limit=20&offset=0', {
    withCredentials: true,
  });

  return response.data;
};

export const addPodcastToCollection = async (id: string): Promise<any> => {
  const response = await gamesApi.post(`spotify/podcasts/add/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const removePodcastFromCollection = async (id: string): Promise<any> => {
  const response = await gamesApi.delete(`spotify/podcasts/remove/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
