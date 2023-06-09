import styled from 'styled-components';
import NewReleases from '#/components/NewReleases/NewReleases';

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <StyledHome>
      <NewReleases />
    </StyledHome>
  );
};

export default Home;
