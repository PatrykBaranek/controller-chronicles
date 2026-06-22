import starIcon from '#/assets/starIcon.svg';
import getGameIdFromUrl from '#/utils/getGameIdFromUrl';
import {
  useBestsellers,
  useNewReleases,
  useReviewVideos,
  useTrailerVideos,
  useTrending,
} from '#/hooks/useHomeData';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(8rem, auto);
  grid-template-areas:
    'feat'
    'board'
    'live'
    'review'
    'upcoming'
    'podcast';
  gap: 1rem;
  padding-bottom: 2rem;

  > * {
    opacity: 0;
    animation: ${fadeUp} 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  > *:nth-child(1) { animation-delay: 0.04s; }
  > *:nth-child(2) { animation-delay: 0.1s; }
  > *:nth-child(3) { animation-delay: 0.16s; }
  > *:nth-child(4) { animation-delay: 0.22s; }
  > *:nth-child(5) { animation-delay: 0.28s; }
  > *:nth-child(6) { animation-delay: 0.34s; }

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 11rem;
    grid-template-areas:
      'feat feat board live'
      'feat feat board review'
      'upcoming upcoming podcast podcast';
  }
`;

const tile = `
  position: relative;
  overflow: hidden;
  border-radius: 1.1rem;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
`;

const StyledFeatured = styled(Link)`
  ${tile}
  grid-area: feat;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(0, 235, 255, 0.25);

  img.cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
    z-index: -2;
  }
  .scrim {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(0deg, rgba(13, 9, 28, 0.95) 12%, rgba(34, 23, 56, 0.2) 60%, transparent 100%),
      linear-gradient(90deg, rgba(13, 9, 28, 0.6) 0%, transparent 70%);
  }
  .eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.neon};
    margin-bottom: 0.5rem;
  }
  h2 {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    line-height: 1;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  .meta {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.7rem;
    font-size: 0.85rem;
    img {
      width: 0.85rem;
      height: 0.85rem;
    }
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
  }
`;

const StyledTile = styled.div`
  ${tile}
`;

const StyledBoard = styled(StyledTile)`
  grid-area: board;
  .title {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: 1rem;
  }
  ol {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  li a {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.86rem;
    transition: color 0.2s ease;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
  .rank {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: 1rem;
    width: 1.3rem;
    background: ${({ theme }) => theme.colors.secondaryGradient};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledSteam = styled(Link)`
  ${tile}
  grid-area: live;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.white};
  border-color: rgba(0, 235, 255, 0.3);
  img.cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }
  .scrim {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(0deg, rgba(13, 9, 28, 0.95) 14%, transparent 85%);
  }
  .k {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #3ce77f;
  }
  .name {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 0.86rem;
    margin-top: 0.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
  }
`;

const StyledReview = styled(Link)`
  ${tile}
  grid-area: review;
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.white};
  img.thumb {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
  }
  .scrim {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(0deg, rgba(13, 9, 28, 0.92) 10%, transparent 80%);
  }
  .k {
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.neon};
  }
  .t {
    font-size: 0.82rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
  }
`;

const StyledUpcoming = styled(StyledTile)`
  grid-area: upcoming;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.8rem;
    object-fit: cover;
    flex-shrink: 0;
  }
  .k {
    font-size: 0.64rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.secondary};
  }
  .name {
    font-family: ${({ theme }) => theme.fonts?.display};
    font-size: 1.15rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: 0.2rem 0;
  }
  .count {
    color: ${({ theme }) => theme.colors.neon};
    font-size: 0.86rem;
  }
`;

const StyledTrailer = styled(Link)`
  ${tile}
  grid-area: podcast;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.white};
  img {
    width: 7rem;
    height: 4.5rem;
    border-radius: 0.6rem;
    object-fit: cover;
    flex-shrink: 0;
  }
  .k {
    font-size: 0.64rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.magenta};
  }
  .name {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 0.95rem;
    margin-top: 0.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
  }
`;

const BentoHome = () => {
  const { data: trending } = useTrending();
  const { data: newReleases } = useNewReleases();
  const { data: reviews } = useReviewVideos();
  const { data: trailers } = useTrailerVideos();
  const { data: bestsellers } = useBestsellers();

  const featured = trending?.results?.[0];
  const leaderboard = trending?.results?.slice(0, 5) ?? [];
  const upcoming = newReleases?.results?.[0];
  const review = reviews?.[0];
  const trailer = trailers?.[0];
  const topSteam = bestsellers?.games?.[0];
  const topSteamId = topSteam ? getGameIdFromUrl(topSteam.link) : null;

  const daysUntil = upcoming?.firstReleaseDate
    ? dayjs(upcoming.firstReleaseDate).diff(dayjs(), 'day')
    : null;

  return (
    <StyledGrid>
      {featured && (
        <StyledFeatured to={`/games/${featured.id}`}>
          {featured.background_image && (
            <img className='cover' src={featured.background_image} alt={featured.name} />
          )}
          <span className='scrim' />
          <span className='eyebrow'>✦ Most Popular</span>
          <h2>{featured.name}</h2>
          {featured.aggregatedRating && (
            <span className='meta'>
              <img src={starIcon} alt='' />
              {Math.round(featured.aggregatedRating)} ·{' '}
              {featured.genres?.[0]?.name ?? 'Game'}
            </span>
          )}
        </StyledFeatured>
      )}

      <StyledBoard>
        <p className='title'>Trending</p>
        <ol>
          {leaderboard.map((game, idx) => (
            <li key={game.id}>
              <Link to={`/games/${game.id}`}>
                <span className='rank'>{idx + 1}</span>
                <span className='name'>{game.name}</span>
              </Link>
            </li>
          ))}
        </ol>
      </StyledBoard>

      {topSteam ? (
        <StyledSteam to={topSteam.link} target='_blank'>
          {topSteamId && (
            <img
              className='cover'
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${topSteamId}/header.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = topSteam.img;
              }}
              alt={topSteam.name}
            />
          )}
          <span className='scrim' />
          <span className='k'>★ Top on Steam</span>
          <span className='name'>{topSteam.name}</span>
        </StyledSteam>
      ) : (
        <StyledTile style={{ gridArea: 'live' }} />
      )}

      {review ? (
        <StyledReview to={review.link} target='_blank'>
          <img className='thumb' src={review.thumbnail} alt={review.title} />
          <span className='scrim' />
          <div>
            <p className='k'>Latest Review</p>
            <p className='t'>{review.title}</p>
          </div>
        </StyledReview>
      ) : (
        <StyledTile style={{ gridArea: 'review' }} />
      )}

      <StyledUpcoming>
        {upcoming?.background_image && (
          <img src={upcoming.background_image} alt={upcoming.name} />
        )}
        <div>
          <p className='k'>Next Big Release</p>
          <p className='name'>{upcoming?.name ?? 'Coming soon'}</p>
          {daysUntil !== null && daysUntil >= 0 && (
            <p className='count'>in {daysUntil} days</p>
          )}
        </div>
      </StyledUpcoming>

      {trailer ? (
        <StyledTrailer to={trailer.link} target='_blank'>
          <img src={trailer.thumbnail} alt={trailer.title} />
          <div>
            <p className='k'>Latest Trailer</p>
            <p className='name'>{trailer.title}</p>
          </div>
        </StyledTrailer>
      ) : (
        <StyledTile style={{ gridArea: 'podcast' }} />
      )}
    </StyledGrid>
  );
};

export default BentoHome;
