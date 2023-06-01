import styled from 'styled-components';

import Carousel from './Carousel';
import { useQuery } from 'react-query';
import { getBestsellers } from '#/api/gamesApi';

const StyledWrapper = styled.div`
  width: 100%;
  height: 25rem;
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
    height: unset;
    padding-inline: 1rem;
  }
`;

const Bestsellers = () => {
  const { data } = useQuery(['/home'], () => getBestsellers());
  const bestsellers = data?.slice(0, 5);
  return (
    <StyledWrapper>
      <Carousel bestsellers={bestsellers} />
    </StyledWrapper>
  );
};

export default Bestsellers;
