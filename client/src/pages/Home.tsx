import Bestsellers from '#/components/Bestsellers/Bestsellers';
import NewReleases from '#/components/NewReleases/NewReleases';
import VideoSlider from '#/components/UI/VideoSlider';
import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <StyledHome>
      <NewReleases />
      <Bestsellers />
      <VideoSlider variant='review' heading='Reviews' />
      <VideoSlider variant='trailer' heading='Trailers' />
    </StyledHome>
  );
};

export default Home;
