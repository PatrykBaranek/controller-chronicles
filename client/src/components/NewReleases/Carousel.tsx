import React from 'react';
import useStore from '#/store/store';
import { Games } from '#/types/types';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
import { Skeleton } from '@mui/material';
import { Await } from 'react-router';
import { twMerge } from 'tailwind-merge';

type CarouselProps = {
  newReleases: Promise<any>;
};

function Carousel({ newReleases }: CarouselProps) {
  const [current, setCurrent] = React.useState(0);
  const [autoPlay, setAutoPlay] = React.useState(true);

  const { isMenuOpen } = useStore();

  let timeOut: ReturnType<typeof setTimeout>;

  const slideRight = React.useCallback(() => {
    setCurrent(current !== 4 ? 0 : current + 1);
  }, [current]);

  React.useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 1000);
    }

    return () => clearTimeout(timeOut);
  }, [autoPlay, slideRight]);

  return (
    <div
      className='relative mb-4 flex h-full flex-col items-center gap-4 md:flex-row'
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(false);
      }}
    >
      <div
        className={twMerge(
          'relative h-full w-full md:min-h-100 lg:min-h-120 lg:w-[68%]',
          isMenuOpen && '-z-[1]'
        )}
      >
        <React.Suspense
          fallback={
            <Skeleton
              sx={(theme) => ({
                backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                borderRadius: '0',

                [theme.breakpoints.up('lg')]: {
                  borderRadius: '1rem',
                },
              })}
              variant='rounded'
              animation='wave'
              height='100%'
              width='100%'
            />
          }
        >
          <Await resolve={newReleases}>
            {(newReleases) => {
              return newReleases?.results?.map((item: Games, index: number) => {
                return (
                  <CarouselItem
                    id={item.id}
                    isActive={index === current}
                    key={index}
                    image={item.background_image}
                  />
                );
              });
            }}
          </Await>
        </React.Suspense>
      </div>
      <div className='flex md:w-[30%] md:flex-col md:gap-2'>
        <React.Suspense
          fallback={
            <Skeleton
              sx={(theme) => ({
                backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                borderRadius: '0',

                [theme.breakpoints.up('lg')]: {
                  borderRadius: '1rem',
                },
              })}
              variant='rounded'
              animation='wave'
              height={'100%'}
              width={'100%'}
            />
          }
        >
          <Await resolve={newReleases}>
            {(newReleases) => {
              return newReleases?.results?.map((item: Games, index: number) => {
                return (
                  <CarouselPagination
                    key={index}
                    name={item.name}
                    image={item.background_image}
                    isActive={index === current}
                    onClick={() => setCurrent(index)}
                  />
                );
              });
            }}
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
}

export default Carousel;
