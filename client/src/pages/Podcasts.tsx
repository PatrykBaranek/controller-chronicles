import { Pagination, ThemeProvider, createTheme } from '@mui/material';

import { connectToSpotify, getAllPodcasts } from '../api/gamesApi';
import GameCard from '../components/GameCard/GameCard';
import Spinner from '../components/UI/Spinner';
import useWindowWidth from '../hooks/useWindowWidth';
import { useSpotifyStore } from '../store/store';
import isDesktopWidth from '../utils/isDesktopWidth';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          marginBlock: '1rem',
        },
        outlined: {
          button: {
            fontFamily: 'Inter',
            fontSize: '.8rem',
            background: 'transparent',
            color: 'white',
            borderColor: 'rgba(235, 235, 245, 0.2)',
            '&:hover': {
              background: `linear-gradient(131.88deg, rgba(167, 62, 231, 0.15) 14.48%, rgba(0, 235, 255, 0.15) 83.43%)`,
            },
          },
        },
        ul: {
          gap: '.2rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'white',

          '&.Mui-selected': {
            background: `linear-gradient(131.88deg, rgba(167, 62, 231, 0.15) 14.48%, rgba(0, 235, 255, 0.15) 83.43%)`,
          },
        },

        sizeSmall: {
          borderRadius: '14px',
          margin: '0 2px',
          padding: '0 5px',
          minWidth: '28px',
          height: '28px',
        },
      },
    },
  },
});

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 1rem;
  padding-inline: clamp(1.625rem, 5vw, 3.25rem);
  @media screen and (min-width: 900px) {
    padding-left: 0;
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 2rem;
  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media screen and (min-width: 900px) {
    padding-top: 2rem;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media screen and (min-width: 1300px) {
    padding-inline: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const Podcasts = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const [page, setPage] = useState(1);
  const { isAuth, setAuth } = useSpotifyStore();

  const { data, isLoading } = useQuery(['spotify/login'], () => connectToSpotify(), {
    onSuccess: (data) => {
      setAuth(true);
      window.location.replace(data.url);
    },
    onError: () => {
      setAuth(false);
    },
    enabled: !isAuth,
  });

  const { data: podcastData, isLoading: isPodcastLoading } = useQuery(
    ['spotify', page],
    () => getAllPodcasts((page - 1) * 20),
    {
      enabled: isAuth,
      keepPreviousData: true,
      onError: () => {
        setAuth(false);
      },
    }
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <StyledContainer>
      {isLoading || isPodcastLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledWrapper>
            {podcastData?.items.map((podcast) => (
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
          </StyledWrapper>
          <ThemeProvider theme={theme}>
            <Pagination
              siblingCount={isDesktop ? 1 : 0}
              size={isDesktop ? 'medium' : 'small'}
              count={podcastData?.total}
              variant='outlined'
              page={page}
              onChange={handlePageChange}
            />
          </ThemeProvider>
        </>
      )}
    </StyledContainer>
  );
};

export default Podcasts;
