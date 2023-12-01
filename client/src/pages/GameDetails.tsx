import { getGameById } from '#/api/gamesApi';
import MainInfo from '#/components/GamesDetails/MainInfo';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledDetailsPage = styled.div`
  width: 100%;
  min-height: 100vh;
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
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
  }
`;

const StyledInfoWrapper = styled.div`
  width: 100%;
  padding-inline: 1.5rem;
  @media screen and (min-width: 900px) {
    padding-inline: 0;
  }
  @media screen and (min-width: 1050px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const GameDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading, isFetched } = useQuery(['/games/:id', id], () =>
    getGameById(id)
  );
  const gameInfo = data?.rawgGame;
  console.log(gameInfo);
  const videos = [...(data?.video_reviews || []), ...(data?.game_trailers || [])];
  return (
    <StyledDetailsPage>
      <StyledTopSection>
        <StyledHeroImage src={gameInfo?.background_image} alt={gameInfo?.name} />
        <StyledInfoWrapper>
          <MainInfo gameInfo={gameInfo} />
        </StyledInfoWrapper>
      </StyledTopSection>
    </StyledDetailsPage>
  );
};

export default GameDetails;
