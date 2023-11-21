import Form from '#/components/Form/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import eye from '#/assets/eye.svg';
import crossedEye from '#/assets/crossedEye.svg';
import { useEffect, useState } from 'react';
import { validateEmail } from '#/utils/formValidation';
import { AuthError, UserInputs } from '#/types/types';
import { useMutation } from 'react-query';
import { logInUser } from '#/api/gamesApi';
import { Alert } from '@mui/material';
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';

export const StyledAuth = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 900px) {
    align-items: unset;
    padding-inline: 0;
    align-self: flex-start;
  }
`;

export const StyledAuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  width: 65%;
  @media screen and (min-width: 1050px) {
    width: 40vw;
    align-self: flex-start;
  }
  @media screen and (min-width: 1350px) {
    width: 30vw;
  }

  h1 {
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 4rem;
    @media screen and (min-width: 900px) {
      margin-block: 4rem 2rem;
    }
  }
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
  a {
    font-size: clamp(0.7rem, 1vw, 0.85rem);
    position: absolute;
    right: 0;
    bottom: -60%;
    background: ${({ theme }) => theme.colors.secondaryGradient};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 0.8rem;
    position: absolute;
    bottom: -55%;
    left: 5%;
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const StyledButton = styled.button`
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
`;
export const StyledTextContainer = styled.div`
  text-align: center;
  h3 {
    font-size: 0.95rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 1rem;
  }
  a {
    background: ${({ theme }) => theme.colors.secondaryGradient};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.colors.secondaryGradient};
      bottom: -2px;
      left: 0;
    }
  }
`;
const Login = () => {
  const logIn = useMutation({
    mutationFn: (data: UserInputs) => logInUser(data),
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState<AuthError>();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated() && navigate('/');
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  const onSubmit: SubmitHandler<UserInputs> = (data) => {
    logIn.mutate(data, {
      onSuccess: (data) => {
        if (
          signIn({
            token: data.access_token,
            expiresIn: 1 * 24 * 60,
            tokenType: 'string',
          })
        ) {
          navigate('/');
        }
      },
      onError: (error: any) => {
        setError(error);
      },
    });
  };
  return (
    <StyledAuth>
      <StyledAuthWrapper>
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
                required: true,
              })}
            />
            <img
              onClick={() => setIsPasswordShown((p) => !p)}
              src={isPasswordShown ? eye : crossedEye}
              alt='eye icon'
            />
            <p role='alert'> {errors.password?.type === 'required' && 'Please enter a password'}</p>
            {!errors.password && <Link to={'/'}>Forgot password?</Link>}
          </StyledPasswordContainer>
          <StyledButton>Login</StyledButton>
          <StyledTextContainer>
            <h3>You don’t have an account yet?</h3>
            <Link to={'/signup'}>Sign up! </Link>
          </StyledTextContainer>
        </Form>
      </StyledAuthWrapper>
    </StyledAuth>
  );
};

export default Login;
