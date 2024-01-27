import { Episode } from '#/types/types';
import { useMemo, useState } from 'react';
import Spinner from '../UI/Spinner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import infoIcon from '#/assets/infoIcon.svg';
import EpisodeDetailsModal from './EpisodeDetailsModal';

type Props = { episodes: Episode[]; url?: string; heading: string };

type StyledProps = {
  areIframesLoaded: boolean;
};

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
    gap: 2rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media screen and (min-width: 1380px) {
    gap: 3rem;
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

const StyledIframeWrapper = styled.div<StyledProps>`
  position: relative;
  button {
    display: ${({ areIframesLoaded }) => (areIframesLoaded ? 'none' : 'block')};
    position: absolute;
    top: 2%;
    left: 3%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    img {
      width: 2rem;
      aspect-ratio: 1;
    }
  }
`;

const PodcastEpisodes = ({ episodes, url, heading }: Props) => {
  const [iframeIndex, setIframeIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [episodeId, setEpisodeId] = useState('');

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

  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setEpisodeId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEpisodeId('');
  };

  return (
    <StyledContainer>
      <h1>{heading}</h1>
      {iframeIndex < formatedEpisodes.length && <Spinner />}
      {formatedEpisodes?.map((episode) => (
        <StyledIframeWrapper
          areIframesLoaded={iframeIndex < formatedEpisodes.length}
          key={episode?.id}
        >
          <button onClick={() => handleOpenModal(episode?.id)}>
            <img src={infoIcon} alt='informations icon' />
          </button>
          <iframe
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
        </StyledIframeWrapper>
      ))}
      {iframeIndex === formatedEpisodes.length && url && (
        <Link className='link' target='_blank' to={url}>
          See more episodes
        </Link>
      )}
      {isModalOpen && (
        <EpisodeDetailsModal id={episodeId} isOpen={isModalOpen} handleClose={handleCloseModal} />
      )}
    </StyledContainer>
  );
};

export default PodcastEpisodes;
