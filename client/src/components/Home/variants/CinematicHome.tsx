import Carousel from '#/components/NewReleases/Carousel';
import GameRail from '#/components/Home/GameRail';
import VideoSlider from '#/components/UI/VideoSlider';
import { useNewReleases, useTrending } from '#/hooks/useHomeData';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledCinematic = styled.div`
  width: 100%;
  padding-bottom: 2rem;

  .hero {
    width: 100%;
    margin-bottom: 2.5rem;
    @media screen and (min-width: 900px) {
      min-height: 32rem;
    }
  }
  .reveal {
    opacity: 0;
    animation: ${fadeUp} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .reveal-1 { animation-delay: 0.1s; }
  .reveal-2 { animation-delay: 0.22s; }
`;

const CinematicHome = () => {
  const { data: newReleases, isLoading, isError } = useNewReleases();
  const { data: trending, isLoading: trendingLoading } = useTrending();

  return (
    <StyledCinematic>
      <div className='hero'>
        <Carousel
          newReleases={newReleases?.results}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
      <div className='reveal reveal-1'>
        <GameRail
          heading='Trending Now'
          games={trending?.results}
          isLoading={trendingLoading}
        />
      </div>
      <div className='reveal reveal-2'>
        <VideoSlider variant='review' heading='Latest Reviews' />
      </div>
    </StyledCinematic>
  );
};

export default CinematicHome;
