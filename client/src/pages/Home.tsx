import { useEffect } from 'react';
import { getBestsellers } from '#/api/gamesApi';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Bestsellers from '#/components/Bestsellers/Bestsellers';

const StyledHome = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <StyledHome>
      <Bestsellers />
    </StyledHome>
  );
};

export default Home;
