import { connectToSpotify, getAllPodcasts } from '#/api/gamesApi';
import Spinner from '#/components/UI/Spinner';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding-inline: clamp(1.625rem, 5vw, 3.25rem);
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
  }
`;

const Podcasts = () => {
  const [searchParams] = useSearchParams();
  const isAuthenticated = searchParams.has('success');

  const { data: podcasts, isLoading } = useQuery(['spotify/login'], () => connectToSpotify(), {
    onSuccess: (data) => window.location.replace(data.url),
    enabled: !isAuthenticated,
  });

  const { data } = useQuery(['spotify'], () => getAllPodcasts(), {
    onSuccess: (data) => console.log,
    enabled: isAuthenticated,
  });

  return <StyledWrapper>{isLoading ? <Spinner /> : <div>asd</div>}</StyledWrapper>;
};

export default Podcasts;
