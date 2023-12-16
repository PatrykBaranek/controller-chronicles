import { getSteamPlayersCount, getSteamReviews } from '#/api/gamesApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { StyledGameplayWrapper } from './Gameplay';
import dayjs from 'dayjs';
import { Skeleton } from '@mui/material';

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

const SteamReviews = () => {
  const { id } = useParams();

  const {
    data: reviews,
    isError: reviewsError,
    isLoading: reviewsLoading,
  } = useQuery(['/games/:id/steamReviews', id], () => getSteamReviews(id), {
    keepPreviousData: true,
  });
  const {
    data: playersCount,
    isError: playersCountError,
    isLoading: playersCountLoading,
  } = useQuery(['/games/:id/steamPlayersCount', id], () => getSteamPlayersCount(id), {
    keepPreviousData: true,
  });

  const reviews30Days = {
    count: new Intl.NumberFormat().format(reviews?.reviewsSummaryFrom30Days.usersCount || 0),
    text: reviews?.reviewsSummaryFrom30Days?.textSummary,
    percentage: reviews?.reviewsSummaryFrom30Days?.positivePercentage,
  };
  const reviewsOverall = {
    count: new Intl.NumberFormat().format(reviews?.reviewsSummaryOverall.usersCount || 0),
    text: reviews?.reviewsSummaryOverall?.textSummary,
    percentage: reviews?.reviewsSummaryOverall?.positivePercentage,
  };

  const formattedPlayersCount = new Intl.NumberFormat().format(playersCount?.playersCount || 0);

  return (
    <StyledGameplayWrapper>
      <h2>Steam Informations</h2>
      <div className='main'>
        <p>Reviews from 30 days</p>
        {reviewsLoading || reviewsError ? (
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
        ) : (
          <>
            <span>{reviews30Days.count || '-'}</span>
            <span>{reviewsTextMap[reviews30Days.text as keyof typeof reviewsTextMap] || '-'}</span>
            <span>{reviews30Days.percentage || 0}% / 100%</span>
          </>
        )}
      </div>
      <div className='sides'>
        <p>Overall reviews</p>
        {reviewsLoading || reviewsError ? (
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
        ) : (
          <>
            <span>{reviewsOverall.count || '-'}</span>
            <span>{reviewsTextMap[reviewsOverall.text as keyof typeof reviewsTextMap] || '-'}</span>
            <span>{reviews30Days.percentage || 0}% / 100%</span>
          </>
        )}
      </div>
      <div className='full'>
        <p>Steam current players count</p>
        {playersCountLoading || playersCountError ? (
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
        ) : (
          <>
            <span>{formattedPlayersCount || '-'}</span>
            <span>Updated at {dayjs(playersCount?.updatedAt).format('H:M, DD-MM-YYYY')}</span>
          </>
        )}
      </div>
    </StyledGameplayWrapper>
  );
};

export default SteamReviews;
