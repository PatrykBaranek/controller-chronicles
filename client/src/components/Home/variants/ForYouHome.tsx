import { authClient } from '#/api/auth-client';
import FeaturedHero from '#/components/Hero/FeaturedHero';
import GameRail from '#/components/Home/GameRail';
import { useCollectionsSafe, useNewReleases, useTrending } from '#/hooks/useHomeData';
import { Games } from '#/types/types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledForYou = styled.div`
  width: 100%;
  padding-bottom: 2rem;

  .greeting {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 1.75rem;
    span {
      background: ${({ theme }) => theme.colors.secondaryGradient};
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
`;

const StyledNudge = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1.1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 2.5rem;
  background: ${({ theme }) => theme.colors.inputGradient};
  border: 1px solid rgba(0, 235, 255, 0.3);

  h2 {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: clamp(1.4rem, 3.5vw, 2rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 0.5rem;
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.2rem;
    max-width: 38ch;
  }
  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.6rem;
    border-radius: 100vw;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.secondaryGradient};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows?.softGlow};
    }
  }
`;

const ForYouHome = () => {
  const { data: session } = authClient.useSession();
  const isLogged = !!session;
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'gamer';

  const { data: trending, isLoading: trendingLoading } = useTrending();
  const { data: newReleases, isLoading: newLoading } = useNewReleases();
  const { data: collections } = useCollectionsSafe();

  const collectionGames: Games[] = (collections ?? [])
    .flatMap((collection) => collection.games ?? [])
    .map((game) => game?.igdbGame)
    .filter(Boolean) as Games[];

  if (!isLogged) {
    return (
      <StyledForYou>
        <StyledNudge>
          <h2>Make it yours</h2>
          <p>
            Sign in to build collections, track what you're playing, and get a home page
            tuned to your taste.
          </p>
          <Link to='/login'>Sign in →</Link>
        </StyledNudge>
        <GameRail
          heading='Trending Now'
          games={trending?.results}
          isLoading={trendingLoading}
        />
        <GameRail heading='New Releases' games={newReleases?.results} isLoading={newLoading} />
      </StyledForYou>
    );
  }

  return (
    <StyledForYou>
      <h1 className='greeting'>
        Welcome back, <span>{userName}</span>
      </h1>
      <FeaturedHero game={collectionGames[0] ?? trending?.results?.[0]} />
      {collectionGames.length > 0 && (
        <GameRail heading='Continue From Your Collection' games={collectionGames} />
      )}
      <GameRail
        heading='Recommended For You'
        games={trending?.results}
        isLoading={trendingLoading}
      />
      <GameRail heading='New Releases' games={newReleases?.results} isLoading={newLoading} />
    </StyledForYou>
  );
};

export default ForYouHome;
