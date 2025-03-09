import { addGameToCollection, getUserCollections } from '../../api/gamesApi';
import errorIco from '../../assets/errorIco.svg';
import successIco from '../../assets/successIco.svg';
import { StyledButton } from '../../pages/Login';
import { GameDetailsResponse } from '../../types/types';
import getAuthToken from '../../utils/getAuthToken';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import styled from 'styled-components';
import Autocomplete from '../FilterDrawer/components/Autocomplete';
import CollectionsForm from './CollectionsForm';

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  gameId: number;
};

type InputValue = {
  Collections: {
    id: string;
    name: string;
  };
};

type MappedCollection = {
  id: string;
  name: string;
  games?: GameDetailsResponse[];
};

type StyledProp = {
  $isOpen?: boolean;
};

const StyledDialog = styled(Dialog)<StyledProp>`
  display: ${({ $isOpen }) => ($isOpen ? 'none' : 'initial')};
  .MuiDialog-paper {
    background: ${({ theme }) => theme.colors.mainGradient};
    border-radius: 10px;
    filter: brightness(1.2);
    scrollbar-color: rgba(255, 255, 255, 0.2)
      linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%);
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
    }
    &:has(.Mui-focused) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > * {
      color: ${({ theme }) => theme.colors.secondary};
      font-family: inherit;
    }
  }
  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .MuiDialogContentText-root {
    color: ${({ theme }) => theme.colors.secondary};
    font-family: inherit;
    margin-bottom: 0.5rem;
  }
  .MuiDialogActions-root {
    justify-content: space-between;
    padding-inline: clamp(0.7rem, 2vw, 1.5rem);
  }
  p[role='alert'] {
    font-size: 0.8rem;
    top: 80%;
    left: 50%;
    text-align: center;
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors.red} !important;
  }
  .MuiAutocomplete-popper > * {
    background: linear-gradient(135deg, #0f54e8 0%, #9ddff3 100%);
    border-radius: 10px;
  }
`;

const StyledAddButton = styled(StyledButton)`
  width: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const AddToCollectionForm = ({ handleClose, isOpen, gameId }: Props) => {
  const [collections, setColletions] = useState<MappedCollection[]>();
  const [isGameInEveryCollection, setIsGameInEveryCollection] = useState(false);
  const authToken = getAuthToken();
  const isAuth = useIsAuthenticated();
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);

  const { data, refetch } = useQuery(
    ['availableCollections'],
    () => getUserCollections(authToken),
    {
      onSuccess: (data) => {
        const mappedCollections: MappedCollection[] = data.map((collection) => ({
          id: collection._id,
          name: collection.name,
          games: collection.games,
        }));

        const filteredCollections = mappedCollections?.filter((collection) => {
          return !collection.games?.some((game) => Number(game._id) === gameId);
        });

        setIsGameInEveryCollection(() => {
          return mappedCollections.every((collection) =>
            collection.games?.some((game) => Number(game._id) === gameId)
          );
        });

        setColletions(filteredCollections);
      },
      enabled: isAuth() && isOpen,
      onError: (error: any) => {
        toast('Error', {
          className: 'default',
          description: error?.message,
          duration: 5000,
          icon: <img src={errorIco} />,
          position: 'top-right',
        });
      },
    }
  );
  const addToCollection = useMutation({
    mutationFn: (id: string) => addGameToCollection(authToken, gameId, id),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValue>();

  const onSubmit: SubmitHandler<InputValue> = (data) => {
    addToCollection.mutate(data.Collections.id);
    toast('Game added to collection!', {
      className: 'default',
      description: `Game added to ${data.Collections.name} collection`,
      duration: 5000,
      icon: <img src={successIco} />,
      position: 'top-right',
      style: {
        gap: '1rem',
      },
    });
    handleClose();
  };

  return (
    <>
      <StyledDialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        $isOpen={isNewCollectionModalOpen}
      >
        <DialogTitle>Add game to collection</DialogTitle>
        <DialogContent>
          {collections && !isGameInEveryCollection && (
            <>
              <DialogContentText>Pick a collection</DialogContentText>
              <Autocomplete options={collections} control={control} label='Collections' />
              <p role='alert'>{errors.Collections?.message}</p>
            </>
          )}
          {isGameInEveryCollection && (
            <DialogContentText>
              It's seems that this game is in every of yours collections.
              <br /> Please add a new collection
              {isNewCollectionModalOpen && (
                <CollectionsForm
                  isOpen={isNewCollectionModalOpen}
                  handleClose={() => setIsNewCollectionModalOpen((prev) => !prev)}
                  refetch={refetch}
                />
              )}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <StyledAddButton onClick={handleClose}>Close</StyledAddButton>
          {isGameInEveryCollection ? (
            <StyledAddButton
              onClick={() => {
                setIsNewCollectionModalOpen(true);
              }}
            >
              Create new collection
            </StyledAddButton>
          ) : (
            <StyledAddButton onClick={handleSubmit(onSubmit)}>Add to collection</StyledAddButton>
          )}
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default AddToCollectionForm;
