import { getUserCollections } from '#/api/gamesApi';
import { StyledButton } from '#/pages/Login';
import { CollectionResponse } from '#/types/types';
import getAuthToken from '#/utils/getAuthToken';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import CollectionList from './CollectionList';
import CollectionsForm from './CollectionsForm';
import Spinner from '../UI/Spinner';

type StyledProps = {
  hasCollections?: boolean;
  isLoading?: boolean;
};

const StyledCollectionsContainer = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline: 1.625rem;
  h1 {
    font-size: clamp(1.8rem, 4vw, 2.1rem);
  }
  @media screen and (min-width: 600px) {
    padding-inline: 1rem;
  }
  @media screen and (min-width: 900px) {
    padding-inline: 2rem;
    width: 80%;
    justify-content: ${({ hasCollections }) => (hasCollections ? 'unset' : 'center')};
    margin-top: 2rem;
    min-height: 80vh;
  }
`;

const StyledCollectionWrapper = styled.div<StyledProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 1.6rem;
  position: ${({ isLoading }) => (isLoading ? 'relative' : '')};
  height: ${({ isLoading }) => (isLoading ? '20rem' : '')};
`;

const StyledNoCollection = styled.div`
  display: grid;
  place-items: center;
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`;
const StyledCollectionButton = styled(StyledButton)`
  width: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Collections = () => {
  const [collections, setCollections] = useState<CollectionResponse[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authToken = getAuthToken();

  const { refetch, isLoading, isFetched } = useQuery(
    ['collections'],
    () => getUserCollections(authToken),
    {
      onSuccess: (data) => {
        data.sort((a, b) => b.priority - a.priority);
        setCollections(data);
      },
    }
  );

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <StyledCollectionsContainer hasCollections={!!collections?.length}>
      <h1>Your Collections</h1>
      <StyledCollectionWrapper isLoading={isLoading}>
        {isLoading || !isFetched ? (
          <Spinner />
        ) : (
          <>
            {!!collections?.length ? (
              <CollectionList collections={collections} />
            ) : (
              <StyledNoCollection>
                <h2>Oops! There is no collections yet!</h2>
                <StyledCollectionButton onClick={toggleDialog}>
                  Add new collection
                </StyledCollectionButton>
              </StyledNoCollection>
            )}
          </>
        )}
      </StyledCollectionWrapper>
      <CollectionsForm handleClose={toggleDialog} isOpen={isDialogOpen} refetch={refetch} />
    </StyledCollectionsContainer>
  );
};

export default Collections;
