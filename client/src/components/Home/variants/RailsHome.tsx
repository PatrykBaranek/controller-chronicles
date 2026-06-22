import FeaturedHero from '#/components/Hero/FeaturedHero';
import GameRail from '#/components/Home/GameRail';
import VideoSlider from '#/components/UI/VideoSlider';
import { useNewReleases, useTopRated, useTrending } from '#/hooks/useHomeData';
import styled from 'styled-components';

const StyledRails = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

const RailsHome = () => {
  const { data: trending, isLoading: trendingLoading } = useTrending();
  const { data: newReleases, isLoading: newLoading } = useNewReleases();
  const { data: topRated, isLoading: topLoading } = useTopRated();

  return (
    <StyledRails>
      <FeaturedHero game={trending?.results?.[0]} />
      <GameRail
        heading='Trending Now'
        games={trending?.results?.slice(1)}
        isLoading={trendingLoading}
      />
      <GameRail heading='New Releases' games={newReleases?.results} isLoading={newLoading} />
      <GameRail heading='Top Rated' games={topRated?.results} isLoading={topLoading} />
      <VideoSlider variant='review' heading='Latest Reviews' />
    </StyledRails>
  );
};

export default RailsHome;
