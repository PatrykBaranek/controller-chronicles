import Form from '#/components/Form/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  StyledAuth,
  StyledAuthWrapper,
  StyledButton,
  StyledEmailContainer,
  StyledInput,
  StyledPasswordContainer,
  StyledTextContainer,
} from './Login';
import eye from '#/assets/eye.svg';
import crossedEye from '#/assets/crossedEye.svg';
import { validateEmail, validatePassword } from '#/utils/formValidation';
import { useMutation } from 'react-query';
import { signUpUser } from '#/api/gamesApi';
import { Alert } from '@mui/material';
import { AuthError, UserInputs } from '#/types/types';

const SignUp = () => {
  const signUp = useMutation({
    mutationFn: (data: UserInputs) => signUpUser(data),
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [error, setError] = useState<AuthError>();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = async data => {
    signUp.mutate(data, {
      onSuccess: () => {
        setIsUserRegistered(true);
        reset();
      },
      onError: (error: any) => {
        setError(error);
      },
    });
  };

  return (
    <StyledAuth>
      <StyledAuthWrapper>
        {isUserRegistered && (
          <Alert
            variant='outlined'
            severity='success'
            sx={{ color: '#ebebf5bf', marginBottom: '1rem' }}
          >
            Hi, your account has been created successfully. You can log in now.
          </Alert>
        )}
        {error && (
          <Alert
            variant='outlined'
            severity='error'
            sx={{ color: '#ebebf5bf', marginBottom: '1rem' }}
          >
            {error.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledEmailContainer>
            <StyledInput
              type='text'
              defaultValue=''
              aria-invalid={errors.email || error ? true : false}
              placeholder='Email'
              {...register('email', {
                validate: v => validateEmail(v),
              })}
            />
            <p role='alert'>{errors.email?.message}</p>
          </StyledEmailContainer>
          <StyledPasswordContainer>
            <StyledInput
              type={isPasswordShown ? 'text' : 'password'}
              defaultValue=''
              aria-invalid={errors.password || error ? true : false}
              placeholder='Password'
              {...register('password', {
                validate: v => validatePassword(v),
              })}
            />
            <img
              onClick={() => setIsPasswordShown(p => !p)}
              src={isPasswordShown ? eye : crossedEye}
              alt='eye icon'
            />
            <p role='alert'>{errors.password?.message}</p>
          </StyledPasswordContainer>
          <StyledButton>Sign up</StyledButton>
          <StyledTextContainer>
            <h3>You have an account already?</h3>
            <Link to={'/login'}>Log in! </Link>
          </StyledTextContainer>
        </Form>
      </StyledAuthWrapper>
    </StyledAuth>
  );
};

export default SignUp;
