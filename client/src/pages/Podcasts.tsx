import { Button, CircularProgress, Pagination } from '@mui/material';

import type { Route } from './+types/Podcasts';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { clearEmptyParams, connectToSpotify, getAllPodcasts } from '~/api/gamesApi';
import { AxiosError } from 'axios';
import GameCard from '~/components/GameCard/GameCard';
import { redirect, useFetcher, useSearchParams } from 'react-router';

export async function clientAction() {
  const resp = await connectToSpotify();
  return redirect(resp.url);
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  await clearEmptyParams(url);
  const searchParams = url.searchParams;

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);

  const podcasts = await getAllPodcasts((page - 1) * limit);

  return { podcasts };
}

export default function Podcasts({ loaderData }: Route.ComponentProps) {
  const { podcasts } = loaderData;

  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='flex w-full flex-col justify-center px-[clamp(1.625rem,5vw,3.25rem)] pb-4 md:pl-0'>
      <div className='grid w-full grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 md:pt-8 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:grid-rows-2 xl:px-8'>
        {podcasts?.items.map((podcast) => (
          <GameCard
            key={podcast.id}
            id={podcast.id}
            image={podcast.images[0]?.url}
            title={podcast.name}
            isPodcastCard={true}
            description={podcast.description}
            totalEpisodes={podcast.total_episodes}
          />
        ))}
      </div>
      <Pagination
        siblingCount={isDesktop ? 1 : 0}
        size={isDesktop ? 'medium' : 'small'}
        count={podcasts.total}
        variant='outlined'
        page={searchParams.get('page') ? Number(searchParams.get('page')) : 1}
        onChange={(_, page) => {
          setSearchParams((prev) => {
            return { ...prev, page: page.toString() };
          });
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const fetcher = useFetcher();

  if (error instanceof AxiosError) {
    if (error.status === 403) {
      if (fetcher.state === 'loading') {
        return (
          <div className='flex w-full flex-col items-center justify-center px-[clamp(1.625rem,5vw,3.25rem)] pb-4 md:pl-0'>
            <CircularProgress size={30} />
          </div>
        );
      }

      return (
        <div className='flex w-full flex-col justify-center px-[clamp(1.625rem,5vw,3.25rem)] pb-4 md:pl-0'>
          <fetcher.Form method='post'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <p>Please log in to see the content</p>
              <Button
                className='flex h-full cursor-pointer items-center justify-center rounded-lg bg-[#1db954] p-4 font-bold text-white uppercase transition-colors hover:bg-[#1ed760]'
                type='submit'
              >
                LogIn to Spotify
              </Button>
            </div>
          </fetcher.Form>
        </div>
      );
    }
  }

  return (
    <div className='flex w-full flex-col justify-center px-[clamp(1.625rem,5vw,3.25rem)] pb-4 md:pl-0'>
      <div className='grid w-full grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 md:pt-8 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:grid-rows-2 xl:px-8'>
        <h1>Something went wrong</h1>
        <br />
        <p>Please refresh page</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    </div>
  );
}
