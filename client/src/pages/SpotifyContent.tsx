import { getEpisodesByGameId, getSoundtrackByGameId } from '../api/gamesApi';
import PodcastEpisodes from '../components/PodcastDetails/PodcastEpisodes';
import Spinner from '../components/UI/Spinner';
import { Episode, Soundtrack } from '../types/types';
import { useState } from 'react';
import { useQueries } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledEpisodesWrapper = styled.div`
  position: relative;
`;

const StyledNoSpotify = styled.div`
  h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    text-align: center;
    @media screen and (min-width: 900px) {
      font-size: 2rem;
    }
  }

  a {
    display: block;
    width: fit-content;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ffffff34;
    cursor: pointer;
    background: linear-gradient(135deg, rgba(15, 85, 232, 0.2) 0%, rgba(157, 223, 243, 0.2) 100%);
    color: ${({ theme }) => theme.colors.primary};
    font-family: inherit;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 1.2rem;
    cursor: pointer;
    text-align: center;
    margin: 0 auto;
  }
`;

const StyledSpotifyWrapper = styled.div`
  width: 100%;
  position: relative;
  grid-column: 1 / -1;
  margin: 1rem auto;
`;

const SpotifyContent = ({ id }: { id?: string }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [soundtracks, setSoundtracks] = useState<Soundtrack[]>([]);
  const [spotifyLinked, setSpotifyLinked] = useState(true);

  const spotify = useQueries([
    {
      queryKey: ['/podcast/episodes/game:id', id],
      queryFn: () => getEpisodesByGameId(id!),
      onSuccess: (data: Episode[]) => setEpisodes(data),
      onError: (e: any) => {
        if (e.response?.status === 400 || e.response?.status === 403) {
          setSpotifyLinked(false);
        }
      },
      enabled: spotifyLinked,
    },
    {
      queryKey: ['/podcast/soundtracks/:id', id],
      queryFn: () => getSoundtrackByGameId(id!),
      onSuccess: (data: Soundtrack[]) => setSoundtracks(data),
      onError: (e: any) => {
        if (e.response?.status === 400 || e.response?.status === 403) {
          setSpotifyLinked(false);
        }
      },
      enabled: spotifyLinked,
    },
  ]);

  const isSpotifyLoading = spotify.some((data) => data.isLoading);

  return (
    <StyledSpotifyWrapper>
      {isSpotifyLoading ? (
        <Spinner />
      ) : (
        !spotifyLinked && (
          <StyledNoSpotify>
            <h2>You need to link your Spotify account to see content</h2>
            <Link to={'/podcasts'}>Link Spotify</Link>
          </StyledNoSpotify>
        )
      )}
      {episodes.length !== 0 && (
        <StyledEpisodesWrapper>
          <PodcastEpisodes heading="Spotify Episodes" data={episodes.slice(0, 8)} />
        </StyledEpisodesWrapper>
      )}
      {soundtracks.length !== 0 && (
        <StyledEpisodesWrapper>
          <PodcastEpisodes heading="Spotify soundtracks" data={soundtracks.slice(0, 8)} />
        </StyledEpisodesWrapper>
      )}
    </StyledSpotifyWrapper>
  );
};

export default SpotifyContent;
