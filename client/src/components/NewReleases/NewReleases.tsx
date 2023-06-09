import styled from 'styled-components';

import Carousel from './Carousel';
import { useQuery } from 'react-query';
import { getNewReleasedGames } from '#/api/gamesApi';

const StyledWrapper = styled.div`
  width: 100%;
  height: 65vw;
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
    height: unset;
    padding-inline: 1rem;
  }
`;

const NewReleases = () => {
  const currentDate = new Date();
  const { data: games } = useQuery(
    ['newReleases'],
    () => getNewReleasedGames(currentDate),
    {
      staleTime: 24 * 60 * 60 * 1000,
    }
  );
  return (
    <StyledWrapper>
      <Carousel newReleases={games?.results} />
    </StyledWrapper>
  );
};

export default NewReleases;
