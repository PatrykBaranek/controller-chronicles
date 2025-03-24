import infoIcon from '#/assets/infoIcon.svg';
import type { Episode, Soundtrack } from '#/types/types';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import EpisodeDetailsModal from './EpisodeDetailsModal';

type Props = { data: Episode[] | Soundtrack[]; url?: string; heading: string };

const PodcastEpisodes = ({ data, url, heading }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeIndex, setIframeIndex] = useState(0);
  const [episodeId, setEpisodeId] = useState('');

  const formatSpotifyLink = (link: string) => {
    const isSpotifyEpisode = link.includes('/episode/');

    if (isSpotifyEpisode) {
      return (
        link.substring(0, link.indexOf('/episode/')) +
        '/embed' +
        link.substring(link.indexOf('/episode/'))
      );
    }

    return (
      link.substring(0, link.indexOf('/album/')) +
      '/embed' +
      link.substring(link.indexOf('/album/'))
    );
  };

  const formatedEpisodes = useMemo(() => {
    return data.map((episode) => {
      const link = episode?.external_urls?.spotify;
      const newLink = formatSpotifyLink(link);

      return {
        ...episode,
        external_urls: {
          spotify: newLink,
        },
      };
    });
  }, [data]);

  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setEpisodeId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEpisodeId('');
  };

  return (
    <div className='relative grid min-h-[80svh] grid-cols-1 gap-4 md:my-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-12'>
      <h1 className='col-span-full'>{heading}</h1>
      {formatedEpisodes?.map((episode) => (
        <div className='relative' key={episode?.id}>
          {episode?.type === 'episode' && (
            <button
              onClick={() => handleOpenModal(episode?.id)}
              className={`${iframeIndex < formatedEpisodes.length ? 'hidden' : 'block'} absolute top-[2%] left-[3%] cursor-pointer border-none bg-transparent`}
            >
              <img src={infoIcon} alt='informations icon' className='aspect-square w-8' />
            </button>
          )}
          <iframe
            src={episode?.external_urls.spotify}
            width='100%'
            height='360'
            allow='clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            style={{
              border: 'none',
              display: iframeIndex < formatedEpisodes.length ? 'none' : 'block',
            }}
            onLoad={() => setIframeIndex((prev) => prev + 1)}
          />
        </div>
      ))}
      {iframeIndex === formatedEpisodes.length && url && (
        <Link
          className='col-span-full mx-auto mb-4 w-fit rounded-full bg-gradient-to-r from-[rgba(15,85,232,0.1)] to-[rgba(157,223,243,0.1)] px-8 py-4 text-center text-[clamp(0.8rem,3vw,1rem)] text-[#ebebf5bf] transition-all duration-200 hover:contrast-[5]'
          target='_blank'
          to={url}
        >
          See more episodes
        </Link>
      )}
      {isModalOpen && (
        <EpisodeDetailsModal id={episodeId} isOpen={isModalOpen} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default PodcastEpisodes;
