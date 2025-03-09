import { getPodcastById } from '../api/gamesApi';
import MainInfo from '../components/PodcastDetails/MainInfo';
import PodcastEpisodes from '../components/PodcastDetails/PodcastEpisodes';
import Spinner from '../components/UI/Spinner';
import { useSpotifyStore } from '../store/store';
import { Episode } from '../types/types';
import { useState } from 'react';
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

const PodcastDetails = () => {
  const { id } = useParams();
  const { isAuth, setAuth } = useSpotifyStore();
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const {
    data: podcast,
    isLoading,
    isError,
  } = useQuery(['spotify', id], () => getPodcastById(id!), {
    enabled: isAuth,
    keepPreviousData: true,
    onSuccess: (data) => {
      setEpisodes(data.episodes.items?.slice(0, 8));
    },
    onError: (e) => {
      setAuth(false);
    },
  });

  return (
    <StyledDetailsPage>
      {isLoading || isError ? (
        <Spinner />
      ) : (
        <>
          <StyledTopSection>
            <StyledHeroImage src={podcast?.images[0].url} alt={podcast?.name} />
            <StyledInfoWrapper>
              <MainInfo podcast={podcast} />
            </StyledInfoWrapper>
          </StyledTopSection>
          <PodcastEpisodes
            heading='Episodes'
            data={episodes}
            url={podcast?.external_urls.spotify}
          />
        </>
      )}
    </StyledDetailsPage>
  );
};

export default PodcastDetails;
