import {
  getEpisodesByGameId,
  getGameById,
  getReviewsSites,
  getSoundtrackByGameId,
  getSteamReviews,
  getYoutubeVideosByGameId,
} from '#/api/gamesApi';
import DetailsSlider from '#/components/GamesDetails/DetailsSlider';
import Gameplay from '#/components/GamesDetails/Gameplay';
import MainInfo from '#/components/GamesDetails/MainInfo';
import RedditInfo from '#/components/GamesDetails/RedditInfo';
import SteamReviews from '#/components/GamesDetails/SteamReviews';
import { href, Link, useNavigation, useRouteError } from 'react-router';
import { ErrorBoundary as NestedErrorBoundary } from 'react-error-boundary';
import React from 'react';
import ReviewsSitesDrawer from '#/components/GamesDetails/ReviewsSitesDrawer';
import { Route } from './+types/GameDetails';
import SpotifyContent from '~/components/SpotifyContent';
import CircularProgress from '@mui/material/CircularProgress';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const data = await getGameById(params.id);

  const reviews = getYoutubeVideosByGameId('review', params.id);
  const trailers = getYoutubeVideosByGameId('trailer', params.id);

  const reviewSites = getReviewsSites(params.id);

  const steamReviews = getSteamReviews(params.id);
  const steamPlayersCount = getSteamReviews(params.id);

  const spotifyEpisodes = getEpisodesByGameId(data?._id);
  const spotifySoundtracts = getSoundtrackByGameId(data?._id);

  return {
    data,
    reviews,
    trailers,
    reviewSites,
    steamReviews,
    steamPlayersCount,
    spotifyEpisodes,
    spotifySoundtracts,
  };
}

export default function GameDetails({ loaderData }: Route.ComponentProps) {
  const { data, reviews, trailers } = loaderData;

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const navigation = useNavigation();
  const isError = useRouteError();

  const gameInfo = data?.rawgGame;
  const isGameOnSteam = gameInfo?.stores?.some((store) => store.store.slug === 'steam');
  const isLoading = navigation.state === 'loading';

  if (isLoading || isError) {
    return (
      <div className='flex w-full items-center justify-center md:pt-[2rem]'>
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className='relative min-h-screen w-full md:pt-[2rem]'>
      <div className='flex w-full flex-col lg:px-[1rem] xl:items-center xl:justify-center xl:gap-[2rem]'>
        <img
          className='h-[850px] w-full md:rounded-2xl'
          src={gameInfo?.background_image}
          alt={gameInfo?.name}
          loading='lazy'
        />
        <div className='w-full px-[1.5rem] md:flex md:flex-col md:gap-[3rem] md:px-0 xl:justify-center xl:gap-0'>
          <MainInfo gameInfo={gameInfo} gameId={data?._id} setIsDrawerOpen={setIsDrawerOpen} />
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 px-6 md:my-8 lg:grid-cols-2 lg:gap-12'>
        <div>
          <h2 className='mb-2 text-2xl font-bold md:text-3xl lg:text-4xl'>Game description</h2>
          <p className='leading-[1.1]'>{gameInfo?.description_raw.split('\n\n')[0]}</p>
        </div>

        {(gameInfo?.reddit_url || gameInfo?.reddit_name) && <RedditInfo gameInfo={gameInfo} />}

        <Gameplay hltbData={data?.howLongToBeat} />

        {isGameOnSteam && <SteamReviews />}

        <NestedErrorBoundary fallback={<div>Failed to load reviews</div>}>
          <React.Suspense>
            <DetailsSlider heading='Reviews' videosPromise={reviews} />
          </React.Suspense>
        </NestedErrorBoundary>

        <NestedErrorBoundary fallback={<div>Failed to load trailers</div>}>
          <React.Suspense>
            <DetailsSlider heading='Trailers' videosPromise={trailers} />
          </React.Suspense>
        </NestedErrorBoundary>

        <NestedErrorBoundary fallback={<UnauthorizeFallback />}>
          <React.Suspense fallback={<SpotifyLoader />}>
            <SpotifyContent />
          </React.Suspense>
        </NestedErrorBoundary>

        <ReviewsSitesDrawer isOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className='flex w-full items-center justify-center'>
      <div
        role='alert'
        className='flex transform items-center rounded-lg border-l-4 border-red-500 bg-red-100 p-2 text-red-900 transition duration-300 ease-in-out hover:scale-105 hover:bg-red-200 dark:border-red-700 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800'
      >
        <svg
          stroke='currentColor'
          viewBox='0 0 24 24'
          fill='none'
          className='mr-2 h-5 w-5 flex-shrink-0 text-red-600'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            stroke-width='2'
            stroke-linejoin='round'
            stroke-linecap='round'
          ></path>
        </svg>
        <p className='text-xs font-semibold'>Error - Something went wrong.</p>
      </div>
    </div>
  );
}

function UnauthorizeFallback() {
  return (
    <div className='col-start-1 col-end-2'>
      <h2 className='mb-4 text-center text-lg md:text-2xl'>
        You need to be authorized to see spotify content
      </h2>
      <Link
        to={href('/podcasts')}
        className='mx-auto block w-fit cursor-pointer rounded-full border border-[#ffffff34] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-2 text-center text-lg font-medium text-[#ebebf5bf]'
      >
        Authorize
      </Link>
    </div>
  );
}

function SpotifyLoader() {
  return (
    <div className='flex flex-row gap-2'>
      <div className='h-4 w-4 animate-bounce rounded-full bg-green-500' />
      <div className='h-4 w-4 animate-bounce rounded-full bg-green-500 [animation-delay:-.3s]' />
      <div className='h-4 w-4 animate-bounce rounded-full bg-green-500 [animation-delay:-.5s]' />
    </div>
  );
}
