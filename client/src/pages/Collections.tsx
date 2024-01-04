import { deleteCollection, getUserCollections } from '#/api/gamesApi';
import Card from '#/components/UI/Card';
import getAuthToken from '#/utils/getAuthToken';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import leaveIcon from '#/assets/leaveIcon.svg';
import trashIcon from '#/assets/trashIco.svg';

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 1rem;

  @media screen and (min-width: 900px) {
    padding-top: 2rem;
  }
  @media screen and (min-width: 1300px) {
    padding-inline: 2rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledSplideSlide = styled(SplideSlide)`
  @media screen and (min-width: 900px) {
    padding-block: 1rem;
  }
`;
const StyledCollectionItem = styled(Link)`
  border-radius: 0.7rem;
  overflow: hidden;
  img {
    width: 100%;
    aspect-ratio: 3/2;
  }
`;

const StyledCollectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  height: 1.1rem;

  @media screen and (min-width: 900px) {
    justify-content: unset;
    gap: 2rem;
  }
  .heading {
    display: flex;
    gap: 0.5rem;
    h3 {
      font-size: 1.1rem;
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  .delete {
    background: transparent;
    border: none;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
`;

const StyledCollection = styled.div`
  padding-inline: 1rem;
  @media screen and (min-width: 900px) {
    padding-inline: 0;
  }
`;

const Collections = () => {
  const authToken = getAuthToken();

  const {
    data: collections,
    isLoading,
    isError,
  } = useQuery(['availableCollections'], () => getUserCollections(authToken));

  const removeCollection = useMutation({
    mutationFn: (id: string) => deleteCollection(id, authToken),
  });

  const handleDeleteCollection = (id: string) => {
    removeCollection.mutate(id, {
      onSuccess: () => {
        console.log('deleted');
      },
    });
  };

  return (
    <StyledWrapper>
      {collections?.map((collection) => (
        <>
          {isLoading || isError ? (
            <Skeleton
              sx={{
                backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
                borderRadius: '1rem',
              }}
              animation='wave'
              variant='rounded'
              height={'200px'}
              width={'100%'}
            />
          ) : (
            <StyledCollection>
              <StyledCollectionTitle>
                <Link className='heading' to={`${collection._id}`}>
                  <h3>{collection.name}</h3>
                  <img src={leaveIcon} alt='Leave icon' />
                </Link>
                <button onClick={() => handleDeleteCollection(collection._id)} className='delete'>
                  <img src={trashIcon} alt='bin icon' />
                </button>
              </StyledCollectionTitle>
              <Splide
                key={`${collection.name}:${collection._id}`}
                options={{
                  arrows: false,
                  pagination: false,
                  autoplay: false,
                  interval: 4000,
                  rewind: true,
                  gap: '1rem',
                  easing: 'ease',
                  perPage: 1,
                  fixedWidth: '100%',
                  mediaQuery: 'min',
                  breakpoints: {
                    900: {
                      fixedWidth: '30%',
                      padding: '1rem',
                    },
                    1500: {
                      fixedWidth: '30%',
                      perPage: 3,
                    },
                  },
                  start: 0,
                }}
              >
                {collection.games.map((game) => (
                  <StyledSplideSlide key={`${collection.name}:${game._id}`}>
                    <Card>
                      <StyledCollectionItem to={`/games/${game._id}`}>
                        <img
                          src={game.rawgGame.background_image}
                          alt={`${game.rawgGame.name} image`}
                        />
                      </StyledCollectionItem>
                    </Card>
                  </StyledSplideSlide>
                ))}
              </Splide>
            </StyledCollection>
          )}
        </>
      ))}
    </StyledWrapper>
  );
};

export default Collections;
