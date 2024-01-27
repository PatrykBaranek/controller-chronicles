import { getEpisodesByGameId, getGameById, getYoutubeVideosByGameId } from '#/api/gamesApi';
import DetailsSlider from '#/components/GamesDetails/DetailsSlider';
import Gameplay from '#/components/GamesDetails/Gameplay';
import MainInfo from '#/components/GamesDetails/MainInfo';
import RedditInfo from '#/components/GamesDetails/RedditInfo';
import SteamReviews from '#/components/GamesDetails/SteamReviews';
import PodcastEpisodes from '#/components/PodcastDetails/PodcastEpisodes';
import Spinner from '#/components/UI/Spinner';
import { Episode } from '#/types/types';
import { useState } from 'react';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledEpisodesWrapper = styled.div`
  position: relative;
  grid-column: 1 / -1;
`;

const GameDetails = () => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const results = useQueries([
    {
      queryKey: ['/games/:id', id],
      queryFn: () => getGameById(id),
    },
    {
      queryKey: ['/games/:id/reviews', id],
      queryFn: () => getYoutubeVideosByGameId('review', id!),
    },
    {
      queryKey: ['/games/:id/trailers', id],
      queryFn: () => getYoutubeVideosByGameId('trailer', id!),
    },
    {
      queryKey: ['/podcast/episodes/game:id', id],
      queryFn: () => getEpisodesByGameId(id!),
      onSuccess: (data: Episode[]) => setEpisodes(data),
    },
  ]);

  const [{ data: data }, { data: reviews }, { data: trailers }] = results;

  const isLoading = results?.some((data) => data.isLoading);
  const isError = results?.some((data) => data.isError);
  const gameInfo = data?.rawgGame;

  const isGameOnSteam = gameInfo?.stores.filter((store) => {
    return store.store.slug === 'steam';
  });

  return (
    <StyledDetailsPage>
      {isLoading || isError ? (
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
            {episodes && (
              <StyledEpisodesWrapper>
                <PodcastEpisodes heading='Spotify Episodes' episodes={episodes.slice(0, 8)} />
              </StyledEpisodesWrapper>
            )}
          </StyledContainer>
        </>
      )}
    </StyledDetailsPage>
  );
};

export default GameDetails;
