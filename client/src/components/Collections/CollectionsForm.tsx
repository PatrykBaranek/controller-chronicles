import { addCollection } from '#/api/gamesApi';
import successIco from '#/assets/successIco.svg';
import { StyledButton } from '#/pages/Login';
import getAuthToken from '#/utils/getAuthToken';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import styled from 'styled-components';
import errorIco from '#/assets/errorIco.svg';

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  refetch: () => void;
};

type InputValue = {
  collectionName: string;
};

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: ${({ theme }) => theme.colors.mainGradient};
    border-radius: 10px;
    filter: brightness(1.2);
    & > * {
      color: ${({ theme }) => theme.colors.secondary};
      font-family: inherit;
    }
  }
  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    input {
      font-family: inherit;
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      outline-color: ${({ theme }) => theme.colors.primary};
    }
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
`;

const StyledAddButton = styled(StyledButton)`
  width: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const validateInput = (text: string) => {
  if (text.length === 0) return 'Collection name must not be empty';
  if (text.length < 3) {
    return 'Collection name must have at least 3 characters';
  }
  if (text.length > 20) {
    return 'Collection name must be shorter than or equal 20 characters';
  }
};

const CollectionsForm = ({ handleClose, isOpen, refetch }: Props) => {
  const authToken = getAuthToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValue>();

  const addToCollection = useMutation({
    mutationFn: (data: InputValue) =>
      addCollection({
        collectionName: data.collectionName,
        authToken,
      }),
    onSuccess: () => refetch(),
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

  const onSubmit: SubmitHandler<InputValue> = (data) => {
    addToCollection.mutate(data);
    toast('Collection created!', {
      className: 'default',
      description: `Collection ${data.collectionName} added`,
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
    <div>
      <StyledDialog open={isOpen} onClose={handleClose} fullWidth>
        <DialogTitle>Add new collection</DialogTitle>
        <DialogContent>
          <DialogContentText>Provide a name of your collection.</DialogContentText>
          <input
            type='text'
            defaultValue=''
            aria-invalid={errors.collectionName ? true : false}
            placeholder='Collection name'
            {...register('collectionName', {
              validate: (v) => validateInput(v),
            })}
          />
          <p role='alert'>{errors.collectionName?.message}</p>
        </DialogContent>
        <DialogActions>
          <StyledAddButton onClick={handleClose}>Close</StyledAddButton>
          <StyledAddButton onClick={handleSubmit(onSubmit)}>Add collection</StyledAddButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default CollectionsForm;
