import { deleteGameFromCollection } from '#/api/gamesApi';
import successIco from '#/assets/successIco.svg';
import { StyledButton } from '#/pages/Login';
import { GameDetailsResponse } from '#/types/types';
import getAuthToken from '#/utils/getAuthToken';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import styled from 'styled-components';
import Autocomplete, { Option } from '../FilterDrawer/components/Autocomplete';

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  games: GameDetailsResponse[];
  collectionId: string;
};

type InputValue = {
  Games: Option[];
};

const StyledDialog = styled(Dialog)`
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

const CollectionEditModal = ({ handleClose, isOpen, games, collectionId }: Props) => {
  const authToken = getAuthToken();
  const [deleteQueue, setDeleteQueue] = useState<Array<string | number>>([]);

  const removeGamesFromCollection = useMutation({
    mutationFn: (id: string | number) => deleteGameFromCollection(collectionId, id, authToken),

    onSuccess: () => {
      setDeleteQueue((prevItem) => prevItem.slice(1));
      if (deleteQueue.length === 0) {
        toast('Games successfully removed from collection!', {
          className: 'default',
          duration: 5000,
          icon: <img src={successIco} />,
          position: 'top-right',
          style: {
            gap: '1rem',
          },
        });

        handleClose();
      }
    },
  });

  const { control, handleSubmit } = useForm<InputValue>();

  const onSubmit: SubmitHandler<InputValue> = (data) => {
    const gamesIds = data.Games.map((game) => game.id);
    setDeleteQueue(gamesIds);

    toast('Removing Games!', {
      className: 'default',
      duration: 2000,
      position: 'top-right',
      style: {
        gap: '1rem',
      },
    });
  };

  useEffect(() => {
    if (deleteQueue.length > 0 && !removeGamesFromCollection.isLoading) {
      removeGamesFromCollection.mutate(deleteQueue[0]);
    }
  }, [deleteQueue]);

  const formattedGames: Option[] = games?.map((game) => ({
    id: game._id,
    name: game.rawgGame?.name,
  }));

  return (
    <>
      <StyledDialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Edit collection</DialogTitle>
        <DialogContent>
          <DialogContentText>Pick a game to remove</DialogContentText>
          {formattedGames && (
            <Autocomplete
              options={formattedGames}
              control={control}
              label='Games'
              multiple={true}
              filterSelectedOptions={true}
            />
          )}
        </DialogContent>
        <DialogActions>
          <StyledAddButton onClick={handleClose}>Close</StyledAddButton>
          <StyledAddButton onClick={handleSubmit(onSubmit)}>Edit</StyledAddButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default CollectionEditModal;
