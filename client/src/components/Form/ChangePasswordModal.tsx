import { requestPasswordChange } from '#/api/gamesApi';
import errorIco from '#/assets/errorIco.svg';
import successIco from '#/assets/successIco.svg';
import { StyledButton } from '#/pages/Login';
import { validateEmail } from '#/utils/formValidation';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

type InputValue = {
  email: string;
};

export const StyledDialog = styled(Dialog)`
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
    padding-block: 2.5rem;
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
`;

export const StyledEmailContainer = styled.div`
  width: 100%;
  position: relative;
  p {
    font-size: 0.8rem;
    position: absolute;
    bottom: -55%;
    left: 5%;
    color: ${({ theme }) => theme.colors.red};
    z-index: 2;
  }
`;

export const StyledAddButton = styled.button`
  width: 45%;
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ffffff34;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(15, 85, 232, 0.2) 0%, rgba(157, 223, 243, 0.2) 100%);
  color: ${({ theme }) => theme.colors.primary};
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 1.2rem;
  width: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

export const StyledInput = styled.input`
  background: linear-gradient(135deg, rgba(15, 85, 232, 0.2) 0%, rgba(157, 223, 243, 0.2) 100%);
  padding: 0.6rem 0 0.6rem 1rem;
  border-radius: 100vh;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-family: inherit;
  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.4);
    outline: none;
  }
`;

const ChangePasswordModal = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValue>();

  const changePassword = useMutation({
    mutationFn: (data: InputValue) => requestPasswordChange(data.email),
    onSuccess: () => {
      navigate('/');
      toast('Success', {
        className: 'default',
        description: `Link has been sent to your email`,
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
      });
    },
    onError: (error: any) => {
      toast('Error', {
        className: 'default',
        description: error?.response?.data?.message,
        duration: 5000,
        icon: <img src={errorIco} />,
        position: 'top-right',
      });
    },
  });

  const onSubmit: SubmitHandler<InputValue> = async (data) => {
    changePassword.mutate(data);
  };

  return (
    <StyledDialog open={isOpen} fullWidth>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <form>
          <StyledEmailContainer>
            <StyledInput
              type='text'
              defaultValue=''
              aria-invalid={errors.email ? true : false}
              placeholder='Email'
              {...register('email', {
                validate: (v) => validateEmail(v),
              })}
            />
            <p role='alert'>{errors.email?.message}</p>
          </StyledEmailContainer>
        </form>
      </DialogContent>
      <DialogActions>
        <StyledAddButton onClick={handleClose}>Cancel</StyledAddButton>
        <StyledAddButton onClick={handleSubmit(onSubmit)}>Confirm</StyledAddButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ChangePasswordModal;
