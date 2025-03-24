import { addGameToCollection, getUserCollections } from '#/api/gamesApi';
import errorIco from '#/assets/errorIco.svg';
import successIco from '#/assets/successIco.svg';
import { GameDetailsResponse } from '#/types/types';
import getAuthToken from '#/utils/getAuthToken';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
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

const AddToCollectionForm = ({ handleClose, isOpen, gameId }: Props) => {
  const [isGameInEveryCollection, setIsGameInEveryCollection] = useState(false);
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);

  const authToken = getAuthToken();
  const isAuth = false; // TODO: fix this

  const { data: collections, refetch } = useQuery({
    enabled: isAuth && isOpen,
    queryKey: ['availableCollections'],
    queryFn: async () => {
      const collections = await getUserCollections(authToken);

      const mappedCollections: MappedCollection[] = collections.map((collection) => ({
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

      return filteredCollections;
    },
  });

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
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth
        sx={{
          display: isNewCollectionModalOpen ? 'none' : 'initial',
          '& .MuiDialog-paper': {
            background: colors.mainGradient,
            borderRadius: '10px',
            filter: 'brightness(1.2)',
            scrollbarColor:
              'rgba(255, 255, 255, 0.2) linear-gradient(180deg, rgba(60, 112, 85, 0.6) 12.85%, rgba(60, 112, 85, 0.35) 61.83%)',
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
            },
            '&:has(.Mui-focused)': {
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            },
            '& > *': {
              color: colors.secondary,
              fontFamily: 'inherit',
            },
          },
          '& .MuiDialogContent-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
          '& .MuiDialogContentText-root': {
            color: colors.secondary,
            fontFamily: 'inherit',
            marginBottom: '0.5rem',
          },
          '& .MuiDialogActions-root': {
            justifyContent: 'space-between',
            paddingInline: 'clamp(0.7rem, 2vw, 1.5rem)',
          },
          '& p[role="alert"]': {
            fontSize: '0.8rem',
            top: '80%',
            left: '50%',
            textAlign: 'center',
            marginTop: '0.5rem',
            color: `${colors.red} !important`,
          },
          '& .MuiAutocomplete-popper > *': {
            background: 'linear-gradient(135deg, #0f54e8 0%, #9ddff3 100%)',
            borderRadius: '10px',
          },
        }}
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
          <button
            className='font-inherit mb-4 cursor-pointer rounded-[2rem] border border-[#ffffff34] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-2 text-base font-medium text-[#ffffff99]'
            onClick={handleClose}
          >
            Close
          </button>

          {isGameInEveryCollection ? (
            <button
              className='font-inherit mb-4 cursor-pointer rounded-[2rem] border border-[#ffffff34] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-2 text-base font-medium text-[#ffffff99]'
              onClick={() => {
                setIsNewCollectionModalOpen(true);
              }}
            >
              Create new collection
            </button>
          ) : (
            <button
              className='font-inherit mb-4 cursor-pointer rounded-[2rem] border border-[#ffffff34] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-2 text-base font-medium text-[#ffffff99]'
              onClick={handleSubmit(onSubmit)}
            >
              Add to collection
            </button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToCollectionForm;
