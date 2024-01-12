import { deleteCollection, getUserCollections } from '#/api/gamesApi';
import leaveIcon from '#/assets/leaveIcon.svg';
import trashIcon from '#/assets/trashIco.svg';
import CollectionsForm from '#/components/Collections/CollectionsForm';
import Card from '#/components/UI/Card';
import getAuthToken from '#/utils/getAuthToken';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledButton } from './Login';
import ConfirmationModal from '#/components/UI/ConfirmationModal';
import { toast } from 'sonner';
import errorIco from '#/assets/errorIco.svg';
import successIco from '#/assets/successIco.svg';
import Spinner from '#/components/UI/Spinner';

type StyledProps = {
  hasCollections?: boolean;
  hasGames?: boolean;
};

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

const StyledCollectionButton = styled(StyledButton)<StyledProps>`
  width: fit-content;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  place-self: center;
  margin-bottom: 1rem;
  margin-block: ${({ hasGames }) => (!hasGames ? '2rem' : '')};
  margin-inline: ${({ hasGames }) => (!hasGames ? 'auto' : '')};

  @media screen and (min-width: 900px) {
    place-self: ${({ hasCollections }) => (hasCollections ? 'end' : 'center')};
    margin-right: 1rem;
    margin-left: 0;
  }
`;

const Collections = () => {
  const authToken = getAuthToken();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pickedId, setPickedId] = useState('');
  const navigate = useNavigate();

  const {
    data: collections,
    refetch,
    isLoading,
  } = useQuery(['availableCollections'], () => getUserCollections(authToken));

  const removeCollection = useMutation({
    mutationFn: (id: string) => deleteCollection(id, authToken),
  });

  const foundCollection = (id: string) => collections?.find((collection) => collection?._id === id);

  const handleDeleteCollection = (id: string) => {
    removeCollection.mutate(id, {
      onSuccess: () => {
        toast('Collection successfully deleted!', {
          className: 'default',
          description: `Collection ${foundCollection(id)?.name} deleted`,
          duration: 5000,
          icon: <img src={successIco} />,
          position: 'top-right',
          style: {
            gap: '1rem',
          },
        });
        refetch();
      },
      onError: (error: any) => {
        toast('Error', {
          className: 'default',
          description: error?.message,
          duration: 5000,
          icon: <img src={errorIco} />,
          position: 'top-right',
        });
      },
    });
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <StyledWrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StyledCollectionButton
            hasGames={!!collections?.length}
            hasCollections={!!collections?.length}
            onClick={toggleDialog}
          >
            Add new collection
          </StyledCollectionButton>
          {collections?.map((collection) => (
            <StyledCollection key={collection._id}>
              <StyledCollectionTitle>
                <Link className='heading' to={`${collection._id}`}>
                  <h3>{collection.name}</h3>
                  <img src={leaveIcon} alt='Leave icon' />
                </Link>
                <button
                  onClick={() => {
                    setPickedId(collection._id);
                    setIsConfirmationModalOpen(true);
                  }}
                  className='delete'
                >
                  <img src={trashIcon} alt='bin icon' />
                </button>
              </StyledCollectionTitle>
              <Splide
                key={`${collection.name}:${collection._id}`}
                options={{
                  arrows: false,
                  pagination: true,
                  autoplay: false,
                  interval: 4000,
                  rewind: true,
                  gap: '1.2rem',
                  easing: 'ease',
                  perPage: 1,
                  fixedWidth: '100%',
                  mediaQuery: 'min',
                  breakpoints: {
                    900: {
                      pagination: false,
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
                {!!collection.games.length ? (
                  collection.games.map((game) => (
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
                  ))
                ) : (
                  <StyledCollectionButton hasGames={false} onClick={() => navigate('/games')}>
                    Add game to collection
                  </StyledCollectionButton>
                )}
              </Splide>
            </StyledCollection>
          ))}
        </>
      )}
      {isDialogOpen && (
        <CollectionsForm handleClose={toggleDialog} isOpen={isDialogOpen} refetch={refetch} />
      )}

      {isConfirmationModalOpen && (
        <ConfirmationModal
          buttonText='Delete'
          heading='Deleting collection'
          contentText='Are you sure you want to delete a collection?'
          confirmCallback={() => handleDeleteCollection(pickedId)}
          isOpen={isConfirmationModalOpen}
          handleClose={() => setIsConfirmationModalOpen((prev) => !prev)}
        />
      )}
    </StyledWrapper>
  );
};

export default Collections;
