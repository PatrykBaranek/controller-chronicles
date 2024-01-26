import { getPodcastById } from '#/api/gamesApi';
import MainInfo from '#/components/PodcastDetails/MainInfo';
import Spinner from '#/components/UI/Spinner';
import { useSpotifyStore } from '#/store/store';
import { Episode } from '#/types/types';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
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
  position: relative;
  padding-inline: 1.5rem;
  min-height: 80svh;

  @media screen and (min-width: 900px) {
    margin-block: 2rem;
  }
  @media screen and (min-width: 1050px) {
    gap: 3rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (min-width: 1380px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  h1,
  .link {
    grid-column: 1 / -1;
  }

  .link {
    font-size: clamp(0.8rem, 3vw, 1rem);
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputGradient};
    padding: 1rem 2rem;
    border-radius: 100vw;
    transition: all 0.2s ease-in-out;
    text-align: center;
    width: fit-content;
    margin: 0 auto 1rem;
    &:hover {
      filter: contrast(5);
    }
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
  const [iframeIndex, setIframeIndex] = useState(0);

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
      console.log('api', e);
      setAuth(false);
    },
  });

  const formatedEpisodes = useMemo(() => {
    return episodes.map((episode) => {
      const link = episode?.external_urls?.spotify;
      const newLink =
        link.substring(0, link.indexOf('/episode/')) +
        '/embed' +
        link.substring(link.indexOf('/episode/'));

      return {
        ...episode,
        external_urls: {
          spotify: newLink,
        },
      };
    });
  }, [episodes]);

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
          <StyledContainer>
            <h1>Episodes</h1>
            {iframeIndex < formatedEpisodes.length && <Spinner />}
            {formatedEpisodes?.map((episode) => (
              <iframe
                key={episode.id}
                src={episode?.external_urls.spotify}
                width='100%'
                height='352'
                allow='clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                style={{
                  border: 'none',
                  display: iframeIndex < formatedEpisodes.length ? 'none' : 'block',
                }}
                onLoad={() => setIframeIndex((prev) => prev + 1)}
              />
            ))}
            {iframeIndex > formatedEpisodes.length && (
              <Link className='link' target='_blank' to={podcast?.external_urls?.spotify || ''}>
                See more episodes
              </Link>
            )}
          </StyledContainer>
        </>
      )}
    </StyledDetailsPage>
  );
};

export default PodcastDetails;
