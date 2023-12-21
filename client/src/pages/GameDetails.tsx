import { getGameById } from '#/api/gamesApi';
import DetailsSlider from '#/components/GamesDetails/DetailsSlider';
import Gameplay from '#/components/GamesDetails/Gameplay';
import MainInfo from '#/components/GamesDetails/MainInfo';
import RedditInfo from '#/components/GamesDetails/RedditInfo';
import SteamReviews from '#/components/GamesDetails/SteamReviews';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const StyledDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
  }
`;
const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  padding-inline: 1.5rem;
  @media screen and (min-width: 900px) {
    margin-block: 2rem;
  }
  @media screen and (min-width: 1050px) {
    gap: 3rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const StyledTopSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 900px) {
    padding-inline: 1rem;
    width: 100%;
    flex-direction: column;
  }
  @media screen and (min-width: 1050px) {
    width: 100%;
    flex-direction: row;
    gap: 2rem;
  }
`;
const StyledHeroImage = styled.img`
  width: 100%;
  @media screen and (min-width: 900px) {
    border-radius: 1rem;
    max-width: 100vw;
  }
  @media screen and (min-width: 1050px) {
    width: 50%;
    aspect-ratio: 3/2;
  }
`;

const StyledInfoWrapper = styled.div`
  width: 100%;
  padding-inline: 1.5rem;
  @media screen and (min-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-inline: 0;
  }
  @media screen and (min-width: 1050px) {
    gap: 0;
    justify-content: center;
  }
`;
const StyledGameDescription = styled.div`
  h2 {
    font-size: clamp(1.5rem, 5vw, 2.8rem);
    margin-bottom: 0.5rem;
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
    line-height: 1.1;
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0) translateX(-50%) translateY(-50%);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid #3c705599;
  background: transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const GameDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery(['/games/:id', id], () => getGameById(id));
  const gameInfo = data?.rawgGame;
  const reviews = data?.video_reviews;
  const trailers = data?.game_trailers;

  const isGameOnSteam = gameInfo?.stores.filter((store) => {
    return store.store.slug === 'steam';
  });

  return (
    <StyledDetailsPage>
      {isError || isLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledTopSection>
            <StyledHeroImage src={gameInfo?.background_image} alt={gameInfo?.name} />
            <StyledInfoWrapper>
              <MainInfo gameInfo={gameInfo} />
            </StyledInfoWrapper>
          </StyledTopSection>
          <StyledContainer>
            <StyledGameDescription>
              <h2>Game description</h2>
              <p>{gameInfo?.description_raw.split('\n\n')[0]}</p>
            </StyledGameDescription>
            {(gameInfo?.reddit_url || gameInfo?.reddit_name) && <RedditInfo gameInfo={gameInfo} />}
            <Gameplay hltbData={data?.howLongToBeat} />
            {Boolean(isGameOnSteam?.length) && <SteamReviews />}
            {reviews && <DetailsSlider videos={reviews} heading='Reviews' />}
            {trailers && <DetailsSlider videos={trailers} heading='Trailers' />}
          </StyledContainer>
        </>
      )}
    </StyledDetailsPage>
  );
};

export default GameDetails;
