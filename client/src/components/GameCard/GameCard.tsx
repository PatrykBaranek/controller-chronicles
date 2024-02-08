import heartIcon from '#/assets/heartIcon.svg';
import { Gamecard } from '#/types/types';
import { useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddToCollectionForm from '../Collections/AddToCollectionForm';
import Card from '../UI/Card';

const StyledImage = styled.div`
  width: 100%;
  height: 100%;
  img {
    border-radius: 1rem 1rem 0 0;
    width: 100%;
    aspect-ratio: 3/2;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  padding-inline: 1rem;
  padding-top: 1.2rem;
  display: grid;
`;

const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    width: 100%;
    color: white;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: clamp(0.8rem, 2vw, 1rem);
    @media screen and (min-width: 900px) {
      font-size: clamp(0.7rem, 1vw, 1rem);
      padding-block: 0.2rem;
    }
  }
  p {
    width: 100%;
    text-align: right;
    font-size: clamp(0.8rem, 2vw, 1rem);
    color: ${({ theme }) => theme.colors.primary};
    @media screen and (min-width: 900px) {
      font-size: clamp(0.7rem, 1vw, 1rem);
    }
    span {
      display: inline-block;
      margin-top: 5px;
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-block: 0.3rem;
  line-height: 1.1;
  p {
    font-size: 0.8rem;
  }
`;

const StyledAddToCollection = styled.button`
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  aspect-ratio: 1;
  border: none;
  border-radius: 100vw;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: grid;
  place-items: center;
  @media screen and (min-width: 900px) {
    background: rgba(255, 255, 255, 0.05);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const GameCard = ({
  id,
  image,
  title,
  rating,
  description,
  isPodcastCard,
  totalEpisodes,
}: Gamecard) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAuth = useIsAuthenticated();

  return (
    <>
      <Card>
        <Link style={{ paddingBottom: '2rem' }} to={`${id}`}>
          <StyledImage>
            <img src={image} alt={`${title} image`} />
          </StyledImage>

          <StyledContent>
            <StyledTopSection>
              <h1>{title}</h1>
              {isPodcastCard ? (
                <p>
                  Episodes <span>{totalEpisodes || 0}</span>
                </p>
              ) : (
                <p>
                  Rating <span>{rating ? rating : 0}/10</span>
                </p>
              )}
            </StyledTopSection>
            <StyledDescription>
              {description ? (
                <p>{description && description.slice(0, 250) + ' ...'}</p>
              ) : (
                <p>Something went wrong!</p>
              )}
            </StyledDescription>
            {isAuth() && !isPodcastCard && (
              <StyledAddToCollection
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                <img src={heartIcon} alt='add to collection' />
              </StyledAddToCollection>
            )}
          </StyledContent>
        </Link>
      </Card>
      {isDialogOpen && (
        <AddToCollectionForm
          gameId={Number(id)}
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen((prev) => !prev)}
        />
      )}
    </>
  );
};

export default GameCard;
