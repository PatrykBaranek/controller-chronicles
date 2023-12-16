import { RawgGameDetails } from '#/types/types';
import { Link } from 'react-router-dom';
import redditIcon from '#/assets/redditIcon.svg';
import leaveIcon from '#/assets/leaveIcon.svg';
import styled from 'styled-components';

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
const StyledDescriptionFallback = styled.p`
  color: ${({ theme }) => theme.colors.yellow};
  text-transform: uppercase;
`;

const RedditInfo = ({ gameInfo }: { gameInfo: RawgGameDetails | undefined }) => {
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
      <div>
        <StyledDescription>
          {gameInfo?.reddit_description ? (
            <p>{gameInfo?.reddit_description}</p>
          ) : (
            <StyledDescriptionFallback>This thread has no description</StyledDescriptionFallback>
          )}
        </StyledDescription>
      </div>
    </div>
  );
};

export default RedditInfo;
