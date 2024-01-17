import heartIcon from '#/assets/heartIcon.svg';
import starIcon from '#/assets/starIcon.svg';
import { RawgGameDetails } from '#/types/types';
import iconFilter from '#/utils/iconFilter';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddToCollectionForm from '../Collections/AddToCollectionForm';
type StarProps = {
  rating: number;
  index: number;
};

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: left;
  width: 100%;
  @media screen and (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 0;
    gap: 1.5rem;
  }
  .title {
    font-size: clamp(1.5rem, 5vw, 2.8rem);
  }
  .publisher {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledStarWrapper = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  .rating {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledStar = styled.img<StarProps>`
  width: 1rem;
  height: 1rem;
  filter: ${({ rating, index }) => (index > rating ? 'contrast(2)' : 'contrast(0)')};
  filter: ${({ rating, index }) => (index > rating ? 'grayscale(100%)' : 'grayscale(0)')};
`;

const StyledGenresWrapper = styled.div`
  display: flex;
  gap: 1rem;
  .genre {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 0.8rem;
    padding: 0.2rem 0.3rem;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
    @media screen and (min-width: 900px) {
      padding: 0.4rem 0.5rem;
      border-radius: 15px;
    }
  }
`;
const StyledStoresWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  h4 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const StyledIconsWrapper = styled.div`
  display: flex;
  max-width: 100%;
  gap: 6vw;
  img {
    width: 15vw;
    max-width: 50px;
    aspect-ratio: 3/2;
    object-fit: contain;
    border-radius: 0;
    @media screen and (min-width: 1800px) {
      width: 100%;
    }
  }
  img:not([src]) {
    display: none;
  }
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .wrap {
    display: flex;
    gap: 3rem;
    @media screen and (min-width: 900px) {
      gap: 5rem;
    }
  }

  .link {
    font-size: clamp(0.8rem, 3vw, 1rem);
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputGradient};
    padding: 1rem 2rem;
    border-radius: 100vw;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border: none;

    &:hover {
      filter: contrast(5);
    }

    &:last-child {
      width: fit-content;
      margin-top: 1rem;
    }
  }
  .addToCollection {
    background: ${({ theme }) => theme.colors.inputGradient};
    border: none;
    padding: 1.5rem;
    border-radius: 100vw;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      filter: contrast(5);
    }
    &:disabled {
      pointer-events: none;
      background: ${({ theme }) => theme.colors.secondary};
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition-delay: 0.2;
    }
  }
`;

const MainInfo = ({
  gameInfo,
  gameId,
  setIsDrawerOpen,
  hasReviewSites,
}: {
  gameInfo: RawgGameDetails | undefined;
  gameId?: string | number;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasReviewSites: boolean;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const rating = Math.round((gameInfo?.metacritic! / 20) * 2) / 2 || 0;
  const auth = useIsAuthenticated();
  const isLogged = auth();

  return (
    <StyledTitleWrapper>
      <h1 className='title'>{gameInfo?.name}</h1>
      <p className='publisher'>{gameInfo?.publishers?.map((item) => item.name)}</p>
      <StyledStarWrapper>
        <p className='rating'>{rating}</p>
        {Array.from({ length: 5 }).map((_, idx) => (
          <StyledStar
            key={idx}
            src={starIcon}
            alt='star rating icon'
            index={idx + 1}
            rating={rating}
          />
        ))}
        <p className='rating'>{gameInfo?.ratings_count} ratings</p>
      </StyledStarWrapper>
      <StyledGenresWrapper>
        {gameInfo?.genres.slice(0, 4).map((genre) => (
          <span key={genre.id} className='genre'>
            {genre?.name}
          </span>
        ))}
      </StyledGenresWrapper>
      <StyledStoresWrapper>
        <h4>Available in</h4>
        <StyledIconsWrapper>
          {gameInfo?.stores.map((store, idx) => (
            <img key={store.id || idx} src={iconFilter(store.store.slug)} alt={store.store.name} />
          ))}
        </StyledIconsWrapper>
      </StyledStoresWrapper>
      <StyledButtonsWrapper>
        <div className='wrap'>
          <Link className='link' target='_blank' to={gameInfo?.website || ''}>
            Check publisher website
          </Link>
          <Tooltip title={isLogged ? 'Add to collection' : 'Please log in'} arrow>
            <span>
              <button
                className='addToCollection'
                disabled={!isLogged}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                <img src={heartIcon} alt='add to collection' />
              </button>
            </span>
          </Tooltip>
        </div>
        {hasReviewSites && (
          <button className='link' onClick={() => setIsDrawerOpen((prev) => !prev)}>
            Check sites with reviews
          </button>
        )}
      </StyledButtonsWrapper>
      {isDialogOpen && (
        <AddToCollectionForm
          gameId={Number(gameId)}
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen((prev) => !prev)}
        />
      )}
    </StyledTitleWrapper>
  );
};

export default MainInfo;
