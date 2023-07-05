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
type Inputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  return (
    <StyledAuth>
      <StyledAuthWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledEmailContainer>
            <StyledInput
              type='text'
              defaultValue=''
              aria-invalid={errors.email ? true : false}
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
              aria-invalid={errors.password ? true : false}
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
