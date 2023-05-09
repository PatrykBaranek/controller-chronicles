import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { useQuery } from 'react-query';
import { getGames } from '#/api/gamesApi';
import GameCard from '#/components/GameCard/GameCard';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 2rem;
  @media screen and (min-width: 500px) {
    padding-top: 2rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  @media screen and (min-width: 1050px) {
    padding-inline: 2rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 23rem);
  }
`;

const Games = () => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data } = useQuery(
    ['/games', page],
    () => getGames(page),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    data && setPage(data.currentPage);
  }, [data]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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

  return (
    <StyledContainer>
      <StyledWrapper>
        {data?.results.map(game => (
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
        <Pagination
          siblingCount={isDesktop ? 1 : 0}
          size={isDesktop ? 'medium' : 'small'}
          count={data?.totalPages}
          variant='outlined'
          page={page}
          onChange={handlePageChange}
        />
      </ThemeProvider>
    </StyledContainer>
  );
};

export default Games;
