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
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery(['newReleases'], () => getNewReleasedGames(), {
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <StyledWrapper>
      <Carousel newReleases={games?.results} isLoading={isLoading} isError={isError} />
    </StyledWrapper>
  );
};

export default NewReleases;
