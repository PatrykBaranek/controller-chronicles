import { Games } from '#/types/types';
import GameCard from '#/components/GameCard/GameCard';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import styled from 'styled-components';

const StyledRail = styled.section`
  width: 100%;
  margin-bottom: 2.5rem;

  .splide {
    position: unset;
  }
  .splide__arrows {
    position: absolute;
    top: 0;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }
  .splide__arrow {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(0, 235, 255, 0.3);
    border-radius: 8px;
    width: 1.8rem;
    height: 1.8rem;
    opacity: 1;
    svg {
      fill: #fff;
      width: 0.8rem;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.inputGradient};
    }
  }
`;

const StyledHeading = styled.h2`
  position: relative;
  font-family: ${({ theme }) => theme.fonts?.display};
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: -0.01em;
  margin-bottom: 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: '';
    width: 4px;
    height: 1.05em;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.secondaryGradient};
  }
`;

const StyledHead = styled.div`
  position: relative;
`;

type Props = {
  heading: string;
  games?: Games[];
  isLoading?: boolean;
};

const GameRail = ({ heading, games, isLoading }: Props) => {
  return (
    <StyledRail>
      <StyledHead>
        <StyledHeading>{heading}</StyledHeading>
      </StyledHead>
      {isLoading || !games ? (
        <Skeleton
          sx={{
            backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
            borderRadius: '1rem',
          }}
          animation='wave'
          variant='rounded'
          height={'260px'}
          width={'100%'}
        />
      ) : (
        <Splide
          options={{
            arrows: true,
            pagination: false,
            rewind: true,
            gap: '1.2rem',
            easing: 'ease',
            perPage: 1,
            fixedWidth: '78%',
            mediaQuery: 'min',
            breakpoints: {
              500: { fixedWidth: '46%' },
              900: { fixedWidth: '30%' },
              1300: { fixedWidth: '23%' },
            },
          }}
        >
          {games.map((game) => (
            <SplideSlide key={game.id}>
              <GameCard
                id={game.id}
                title={game.name}
                image={game.background_image}
                rating={
                  game.aggregatedRating
                    ? Math.round((game.aggregatedRating / 10) * 10) / 10
                    : 0
                }
                description={game.description}
              />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </StyledRail>
  );
};

export default GameRail;
