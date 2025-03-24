import React from 'react';
import PodcastEpisodes from '#/components/PodcastDetails/PodcastEpisodes';
import { useRouteLoaderData } from 'react-router';
import { Episode, Soundtrack } from '~/types/types';

function SpotifyContent() {

  const { spotifyEpisodes, spotifySoundtracts } = useRouteLoaderData('gameDetails');

  const episodes: Episode[] = React.use(spotifyEpisodes) as Episode[];
  const soundtracks = React.use(spotifySoundtracts) as Soundtrack[];;

  return (
    <div className='relative col-span-full mx-auto my-4 w-full'>
      {episodes.length !== 0 && (
        <div className='relative'>
          <PodcastEpisodes
            heading='Spotify Episodes'
            data={episodes.slice(0, 8)}
          />
        </div>
      )}

      {soundtracks.length !== 0 && (
        <div className='relative'>
          <PodcastEpisodes
            heading='Spotify soundtracks'
            data={soundtracks.slice(0, 8)}
          />
        </div>
      )}
    </div>
  );
}

export default SpotifyContent;
