import React from 'react';
import { Skeleton } from '@mui/material';
import dayjs from 'dayjs';
import { Await, useRouteLoaderData } from 'react-router';
import { StyledGameplayWrapper } from './Gameplay';
import { SteamReviewsResponse } from '~/types/types';

const reviewsTextMap = {
  'Przytłaczająco pozytywne': 'Overwhelmingly Positive',
  'Bardzo pozytywne': 'Very Positive',
  Pozytywne: 'Positive',
  'W większości pozytywne': 'Mostly Positive',
  Mieszane: 'Mixed',
  'W większości negatywne': 'Mostly negative',
  Negatywne: 'Negative',
  'Bardzo negatywne': 'Very Negative',
  'Przytłaczająco negatywne': 'Overwhelmingly negative',
};

function SteamReviews() {
  const { steamReviews, playersCount } = useRouteLoaderData('gameDetails');

  return (
    <StyledGameplayWrapper>
      <h2>Steam Informations</h2>
      <div className='main'>
        <p>Reviews from 30 days</p>
        <React.Suspense fallback={<SteamReviewsSkeleton />}>
          <Await resolve={steamReviews}>
            {(steamReviews) => <SteamReviews30Days reviews={steamReviews} />}
          </Await>
        </React.Suspense>
      </div>
      <div className='sides'>
        <p>Overall reviews</p>
        <React.Suspense fallback={<SteamReviewsSkeleton />}>
          <Await resolve={steamReviews}>
            {(steamReviews) => <SteamReviewsOverall reviews={steamReviews} />}
          </Await>
        </React.Suspense>
      </div>
      <div className='full'>
        <p>Steam current players count</p>
        <React.Suspense fallback={<SteamReviewsSkeleton />}>
          <Await resolve={playersCount}>
            {(playersCount) => {
              const formattedPlayersCount = new Intl.NumberFormat().format(
                playersCount?.playersCount || 0
              );

              return (
                <>
                  <span>{formattedPlayersCount || '-'}</span>
                  <span>Updated at {dayjs(playersCount?.updatedAt).format('H:M, DD-MM-YYYY')}</span>
                </>
              );
            }}
          </Await>
        </React.Suspense>
      </div>
    </StyledGameplayWrapper>
  );
}

export default SteamReviews;

function SteamReviewsSkeleton() {
  return (
    <Skeleton
      sx={{
        backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
        borderRadius: '1rem ',
      }}
      animation='wave'
      variant='rounded'
      height={'75px'}
      width={'100%'}
    />
  );
}

function SteamReviews30Days({ reviews }: { reviews: SteamReviewsResponse }) {
  const reviews30Days = {
    count: new Intl.NumberFormat().format(reviews?.reviewsSummaryFrom30Days?.usersCount || 0),
    text: reviews?.reviewsSummaryFrom30Days?.textSummary,
    percentage: reviews?.reviewsSummaryFrom30Days?.positivePercentage,
  };

  return (
    <>
      <span>{reviews30Days.count}</span>
      <span>{reviewsTextMap[reviews30Days.text as keyof typeof reviewsTextMap] || '-'}</span>
      <span>{reviews30Days.percentage || 0}% / 100%</span>
    </>
  );
}

function SteamReviewsOverall({ reviews }: { reviews: SteamReviewsResponse }) {
  const reviewsOverall = {
    count: new Intl.NumberFormat().format(reviews?.reviewsSummaryOverall?.usersCount || 0),
    text: reviews?.reviewsSummaryOverall?.textSummary,
    percentage: reviews?.reviewsSummaryOverall?.positivePercentage,
  };

  return (
    <>
      <span>{reviewsOverall.count}</span>
      <span>{reviewsTextMap[reviewsOverall.text as keyof typeof reviewsTextMap] || '-'}</span>
      <span>{reviewsOverall.percentage || 0}% / 100%</span>
    </>
  );
}
