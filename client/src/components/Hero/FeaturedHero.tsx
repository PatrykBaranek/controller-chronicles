import { Games } from '#/types/types';
import starIcon from '#/assets/starIcon.svg';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledHero = styled.section`
  position: relative;
  width: 100%;
  min-height: 78vw;
  border-radius: 1.25rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  isolation: isolate;
  box-shadow: ${({ theme }) => theme.shadows?.glow};

  @media screen and (min-width: 900px) {
    min-height: 46vh;
    margin-top: 1rem;
  }

  /* neon hairline */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.25rem;
    padding: 1px;
    background: ${({ theme }) => theme.colors.secondaryGradient};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.55;
    pointer-events: none;
  }
`;

const StyledCover = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  z-index: -2;
  transform: scale(1.04);
`;

const StyledScrim = styled.span`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
      90deg,
      rgba(34, 23, 56, 0.92) 0%,
      rgba(34, 23, 56, 0.6) 45%,
      rgba(34, 23, 56, 0.1) 100%
    ),
    linear-gradient(0deg, rgba(34, 20, 117, 0.85) 0%, transparent 55%);
`;

const StyledContent = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: clamp(1.25rem, 5vw, 3rem);
  max-width: 640px;

  > * {
    opacity: 0;
    animation: ${fadeUp} 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  > *:nth-child(1) { animation-delay: 0.05s; }
  > *:nth-child(2) { animation-delay: 0.15s; }
  > *:nth-child(3) { animation-delay: 0.25s; }
  > *:nth-child(4) { animation-delay: 0.35s; }
`;

const StyledEyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  width: fit-content;
  background: ${({ theme }) => theme.colors.secondaryGradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  &::before {
    content: '✦';
    color: ${({ theme }) => theme.colors.neon};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.neon};
  }
`;

const StyledTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts?.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: clamp(2rem, 7vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.45);
`;

const StyledMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;

  .score {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.35rem 0.7rem;
    border-radius: 100vw;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(0, 235, 255, 0.35);
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 0.85rem;
    img {
      width: 0.85rem;
      height: 0.85rem;
      filter: grayscale(0);
    }
  }
  .genre {
    padding: 0.35rem 0.7rem;
    border-radius: 100vw;
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.04);
  }
`;

const StyledCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  margin-top: 0.4rem;
  padding: 0.85rem 1.6rem;
  border-radius: 100vw;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.secondaryGradient};
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

  span {
    transition: transform 0.2s ease;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
    filter: brightness(1.08);
  }
  &:hover span {
    transform: translateX(4px);
  }
`;

const FeaturedHero = ({ game }: { game?: Games }) => {
  if (!game) return null;

  const score = game.aggregatedRating ? Math.round(game.aggregatedRating) : null;

  return (
    <StyledHero>
      {game.background_image && <StyledCover src={game.background_image} alt={game.name} />}
      <StyledScrim />
      <StyledContent>
        <StyledEyebrow>Most Popular</StyledEyebrow>
        <StyledTitle>{game.name}</StyledTitle>
        <StyledMeta>
          {score !== null && (
            <span className='score'>
              <img src={starIcon} alt='' />
              {score}
            </span>
          )}
          {game.genres?.slice(0, 3).map((genre) => (
            <span key={genre.id} className='genre'>
              {genre.name}
            </span>
          ))}
        </StyledMeta>
        <StyledCta to={`/games/${game.id}`}>
          View game <span>→</span>
        </StyledCta>
      </StyledContent>
    </StyledHero>
  );
};

export default FeaturedHero;
