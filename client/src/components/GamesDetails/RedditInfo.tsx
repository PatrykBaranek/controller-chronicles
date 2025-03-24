import leaveIcon from '#/assets/leaveIcon.svg';
import redditIcon from '#/assets/redditIcon.svg';
import type { RawgGameDetails } from '#/types/types';
import { Link } from 'react-router';
import { styled } from 'styled-components';

const StyledTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  h2 {
    font-size: clamp(1.5rem, 5vw, 2.8rem);
  }
  img {
    height: 30px;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.yellow};
  margin-bottom: 0.5rem;
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.1;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  margin-bottom: 0.5rem;
`;

type RedditInfoProps = { gameInfo: RawgGameDetails | undefined };

function RedditInfo({ gameInfo }: RedditInfoProps) {
  const fallbackUrlName = gameInfo?.reddit_url.split('/r/').at(-1);

  return (
    <div>
      <StyledTitleWrapper>
        <h2>Reddit Thread</h2>
        <img src={redditIcon} alt='reddit icon' />
      </StyledTitleWrapper>
      {gameInfo?.reddit_url && (
        <StyledLink to={gameInfo?.reddit_url}>
          {gameInfo?.reddit_name || `/r/${fallbackUrlName}`}
          <img src={leaveIcon} alt='leave icon' />
        </StyledLink>
      )}
      {gameInfo?.reddit_description && (
        <div>
          <StyledDescription>
            <p>{gameInfo?.reddit_description}</p>
          </StyledDescription>
        </div>
      )}
    </div>
  );
}

export default RedditInfo;
