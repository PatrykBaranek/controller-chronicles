import {
  getAllPodcasts,
  getBestsellers,
  getGames,
  getNewReleasedGames,
  getNewestYoutubeVideos,
  getUserCollections,
} from '#/api/gamesApi';
import { authClient } from '#/api/auth-client';
import { useQuery } from 'react-query';

const HOUR = 60 * 60 * 1000;

/**
 * Shared, stable-keyed react-query hooks for the home page variants.
 * Every variant reads from the same keys, so switching variants is instant
 * (served from cache, no refetch).
 */

export const useTrending = () =>
  useQuery(['home-trending'], () => getGames(1, 12, '-popularity'), {
    staleTime: HOUR,
  });

export const useTopRated = () =>
  useQuery(['home-top-rated'], () => getGames(1, 12, '-rating'), {
    staleTime: HOUR,
  });

export const useNewReleases = () =>
  useQuery(['home-new-releases'], () => getNewReleasedGames(), {
    staleTime: 24 * HOUR,
  });

export const useReviewVideos = () =>
  useQuery(['home-reviews'], () => getNewestYoutubeVideos('review'), {
    staleTime: HOUR,
  });

export const useTrailerVideos = () =>
  useQuery(['home-trailers'], () => getNewestYoutubeVideos('trailer'), {
    staleTime: HOUR,
  });

export const useBestsellers = () =>
  useQuery(['home-bestsellers'], () => getBestsellers(), { staleTime: HOUR });

export const usePodcastSpotlight = () =>
  useQuery(['home-podcasts'], () => getAllPodcasts(0), { staleTime: 24 * HOUR });

export const useCollectionsSafe = () => {
  const { data: session } = authClient.useSession();
  const isLogged = !!session;

  return useQuery(['home-collections'], () => getUserCollections(), {
    enabled: isLogged,
    staleTime: HOUR,
  });
};
