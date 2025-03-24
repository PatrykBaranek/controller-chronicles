import { clearEmptyParams, getGames } from '#/api/gamesApi';
import GameCard from '#/components/GameCard/GameCard';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { Pagination, Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router';
import type { Route } from './+types/Games';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  await clearEmptyParams(url);
  const searchParams = url.searchParams;

  const page = Number(searchParams.get('page') ?? 1);
  const pageSize = Number(searchParams.get('page_size') ?? 8);
  const query = searchParams.get('query');

  const games = await getGames(page, pageSize, query);

  if (!games) {
    throw new Error('Failed to load games');
  }

  return { games };
}

export default function Games({ loaderData }: Route.ComponentProps) {
  const { games } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);

  const page = searchParams.get('page') ?? 1;

  return (
    <div className='flex w-full flex-col content-center pb-4'>
      <div className='grid w-full grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 md:pt-8 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:px-8'>
        {games.results?.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.name}
            image={game.background_image}
            rating={game.metacritic / 10}
            description={game?.description_raw}
          />
        ))}
      </div>
      <Pagination
        siblingCount={isDesktop ? 1 : 0}
        size={isDesktop ? 'medium' : 'small'}
        count={games?.totalPages}
        variant='outlined'
        page={Number(page)}
        onChange={(_, page) => {
          setSearchParams((prev) => {
            return { ...Object.fromEntries(prev), page: page.toString() };
          });
        }}
      />
    </div>
  );
}

function GamesSkeleton() {
  const fakeGames = Array(8).fill(8);

  return fakeGames.map((_, idx) => (
    <Skeleton
      key={idx}
      sx={(theme) => ({
        backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
        borderRadius: '1rem ',
        height: '300px',

        [theme.breakpoints.up('sm')]: {
          height: '315px',
        },

        [theme.breakpoints.up('md')]: {
          height: '350px',
        },

        [theme.breakpoints.up('lg')]: {
          height: '370px',
        },
      })}
      animation='wave'
      variant='rounded'
      width={'100%'}
    />
  ));
}

export function ErrorBoundary() {
  return (
    <div className='flex w-full flex-col content-center pb-4'>
      <div className='flex h-full items-center justify-center'>
        <h1>Something went wrong</h1>
        <br />
        <p>Please refresh page</p>
      </div>
    </div>
  );
}
