import { resetPassword } from '#/api/gamesApi';
import crossedEye from '#/assets/crossedEye.svg';
import eye from '#/assets/eye.svg';
import successIco from '#/assets/successIco.svg';
import { validatePassword } from '#/utils/formValidation';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSignOut } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';
import { StyledButton } from './Login';

type InputValues = {
  password: string;
  repeatPassword: string;
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
    padding-inline: clamp(0.7rem, 2vw, 1.5rem);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export const StyledAddButton = styled(StyledButton)`
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

export const StyledPasswordContainer = styled.div`
  width: 100%;
  position: relative;
  img {
    width: 24px;
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  p {
    font-size: 0.8rem;
    position: absolute;
    bottom: -55%;
    left: 2%;
    color: ${({ theme }) => theme.colors.red};
  }
`;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/');
    }
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<InputValues>();

  const reset = useMutation({
    mutationFn: (data: InputValues) =>
      resetPassword(searchParams.get('token')!, data.password, data.repeatPassword),
    onSuccess: () => {
      signOut();
      navigate('/login');
      toast('Password successfully changed', {
        className: 'default',
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
        style: {
          gap: '1rem',
        },
      });
    },
  });

  const onSubmit: SubmitHandler<InputValues> = (data) => {
    reset.mutate(data);
  };

  return (
    <StyledDialog open={true} fullWidth>
      <DialogTitle>Reset your password</DialogTitle>
      <DialogContent>
        <form>
          <StyledPasswordContainer>
            <StyledInput
              type={isPasswordShown ? 'text' : 'password'}
              defaultValue=''
              aria-invalid={errors.password ? true : false}
              placeholder='Password'
              {...register('password', {
                validate: (v) => validatePassword(v),
              })}
            />
            <img
              onClick={() => setIsPasswordShown((p) => !p)}
              src={isPasswordShown ? eye : crossedEye}
              alt='eye icon'
            />
            <p role='alert'>{errors?.password?.message}</p>
          </StyledPasswordContainer>
          <StyledPasswordContainer>
            <StyledInput
              type={isPasswordShown ? 'text' : 'password'}
              defaultValue=''
              placeholder='Repeat password'
              {...register('repeatPassword', {
                required: true,
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your passwords do not match';
                  }
                },
              })}
            />
            <p role='alert'>{errors?.repeatPassword?.message}</p>
          </StyledPasswordContainer>
        </form>
      </DialogContent>
      <DialogActions>
        <StyledAddButton onClick={handleSubmit(onSubmit)}>Confirm</StyledAddButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ResetPassword;
