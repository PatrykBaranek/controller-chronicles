import { getGames, getGamesBySearchQuery } from '#/api/gamesApi';
import GameCard from '#/components/GameCard/GameCard';
import useWindowWidth from '#/hooks/useWindowWidth';
import useStore from '#/store/store';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { Pagination, Skeleton, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
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
    grid-template-rows: repeat(2, 23rem);
  }
`;
const StyledSkeleton = styled(Skeleton)`
  height: 300px !important;
  @media screen and (min-width: 500px) {
    height: 315px !important;
  }
  @media screen and (min-width: 900px) {
    height: 350px !important;
  }
  @media screen and (min-width: 1200px) {
    height: 370px !important;
  }
`;

const Games = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const isSearchbarUsed = Boolean(searchParams.get('query'));
  const { games: storedGames, storeGames } = useStore();
  const [page, setPage] = useState(1);
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery(['/games', page], () => getGames(page), {
    keepPreviousData: true,
    enabled: !Boolean(query),
  });
  const { data } = useQuery(['search', query], () => getGamesBySearchQuery(query || undefined), {
    enabled: Boolean(query),
  });

  useEffect(() => {
    if (!!games) {
      storeGames(games.results);
      setPage(games.currentPage);
    }
    if (!!data) {
      storeGames(data.results);
    }
  }, [games, query, data]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <StyledContainer>
      <StyledWrapper>
        {isLoading || isError
          ? Array(8)
              .fill('')
              .map((_, idx) => (
                <StyledSkeleton
                  key={idx}
                  sx={{
                    backgroundImage:
                      'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                    borderRadius: '1rem ',
                  }}
                  animation='wave'
                  variant='rounded'
                  width={'100%'}
                />
              ))
          : storedGames?.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.name}
                image={game.background_image}
                rating={game.metacritic / 10}
              />
            ))}
      </StyledWrapper>
      <ThemeProvider theme={theme}>
        {!isSearchbarUsed && (
          <Pagination
            siblingCount={isDesktop ? 1 : 0}
            size={isDesktop ? 'medium' : 'small'}
            count={games?.totalPages}
            variant='outlined'
            page={page}
            onChange={handlePageChange}
          />
        )}
      </ThemeProvider>
    </StyledContainer>
  );
};

export default Games;
