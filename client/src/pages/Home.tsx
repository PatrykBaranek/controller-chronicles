import Bestsellers from '../components/Bestsellers/Bestsellers';
import VideoSlider from '../components/UI/VideoSlider';
import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100%;
  min-height: 100vh;
  @media screen and (min-width: 900px) {
    grid-column-start: 1;
    grid-column-end: 5;
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <Bestsellers />
      <VideoSlider variant='review' heading='Latests Reviews' />
      <VideoSlider variant='trailer' heading='Upcoming Game Trailers' />
    </StyledHome>
  );
};

export default Home;
