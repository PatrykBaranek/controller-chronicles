import { signUpUser } from '#/api/gamesApi';
import crossedEye from '#/assets/crossedEye.svg';
import eye from '#/assets/eye.svg';
import Form from '#/components/Form/Form';
import { AuthError, UserInputs } from '#/types/types';
import { validateEmail, validatePassword } from '#/utils/formValidation';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  StyledAuth,
  StyledAuthWrapper,
  StyledButton,
  StyledEmailContainer,
  StyledInput,
  StyledPasswordContainer,
  StyledTextContainer,
} from './Login';

const SignUp = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

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

  useEffect(() => {
    isAuthenticated() && navigate('/');
  }, []);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
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
                validate: (v) => validateEmail(v),
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
                validate: (v) => validatePassword(v),
              })}
            />
            <img
              onClick={() => setIsPasswordShown((p) => !p)}
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
