import { signUpUser } from '#/api/gamesApi';
import crossedEye from '#/assets/crossedEye.svg';
import errorIco from '#/assets/errorIco.svg';
import eye from '#/assets/eye.svg';
import successIco from '#/assets/successIco.svg';
import Form from '#/components/Form/Form';
import type { AuthError, UserInputs } from '#/types/types';
import { validateEmail, validatePassword } from '#/utils/formValidation';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

const SignUp = () => {
  const isAuthenticated = false; // replace with your auth logic
  const navigate = useNavigate();

  const signUp = useMutation({
    mutationFn: (data: UserInputs) => signUpUser(data),
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState<AuthError>();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInputs>();

  useEffect(() => {
    isAuthenticated && navigate('/');
  }, []);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    signUp.mutate(data, {
      onSuccess: () => {
        toast('Logged In', {
          className: 'default',
          description: 'Hi, your account has been created successfully. You can log in now.',
          duration: 7000,
          icon: <img src={successIco} />,
          position: 'top-right',
          style: {
            gap: '1rem',
          },
        });

        navigate('/login');
        reset();
      },
      onError: (error: any) => {
        toast('Error', {
          className: 'default',
          description: error?.message,
          duration: 5000,
          icon: <img src={errorIco} />,
          position: 'top-right',
        });

        setError(error);
      },
    });
  };

  return (
    <div className='flex w-full items-center justify-center md:items-start'>
      <div className='mt-16 flex w-[65%] flex-col md:w-[40vw] md:self-start lg:w-[30vw]'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative w-full'>
            <input
              className='font-inherit w-full rounded-full border border-white/20 bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-[0.6rem] text-[#ebebf5bf] focus:border-white/40 focus:outline-none'
              type='text'
              defaultValue=''
              aria-invalid={errors.email || error ? true : false}
              placeholder='Email'
              {...register('email', {
                validate: (v) => validateEmail(v),
              })}
            />
            <p
              className='absolute -bottom-[55%] left-[5%] z-2 text-[0.8rem] text-[#ED695E]'
              role='alert'
            >
              {errors.email?.message}
            </p>
          </div>

          <div className='relative w-full'>
            <input
              className='font-inherit w-full rounded-full border border-white/20 bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-[0.6rem] text-[#ebebf5bf] focus:border-white/40 focus:outline-none'
              type={isPasswordShown ? 'text' : 'password'}
              defaultValue=''
              aria-invalid={errors.password || error ? true : false}
              placeholder='Password'
              {...register('password', {
                validate: (v) => validatePassword(v),
              })}
            />
            <img
              className='absolute top-1/2 right-[5%] w-6 -translate-y-1/2 cursor-pointer'
              onClick={() => setIsPasswordShown((p) => !p)}
              src={isPasswordShown ? eye : crossedEye}
              alt='eye icon'
            />
            <p
              className='absolute -bottom-[55%] left-[5%] text-[0.8rem] text-[#ED695E]'
              role='alert'
            >
              {errors.password?.message}
            </p>
          </div>

          <button className='font-inherit w-[45%] cursor-pointer rounded-[2rem] border border-[#ffffff34] bg-gradient-to-r from-[rgba(15,85,232,0.2)] to-[rgba(157,223,243,0.2)] px-4 py-2 text-[1.2rem] font-medium text-[#ebebf5bf]'>
            Sign up
          </button>

          <div className='text-center'>
            <h3 className='mb-4 text-[0.95rem] font-medium text-[#ffffff99]'>
              You have an account already?
            </h3>
            <Link
              to={'/login'}
              className="relative bg-gradient-to-r from-[#A73EE7] to-[#00EBFF] bg-clip-text font-bold text-transparent after:absolute after:-bottom-[2px] after:left-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-[#A73EE7] after:to-[#00EBFF] after:content-['']"
            >
              Log in!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
