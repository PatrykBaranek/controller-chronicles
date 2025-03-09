'use client';

import errorIco from '../../assets/errorIco.svg';
import searchIco from '../../assets/searchIco.svg';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

type Props = {
  error: string | undefined;
  isEmpty: boolean;
};

const StyledSearchbar = styled.form<Props>`
  display: flex;
  border-radius: 100vh;
  position: relative;
  width: 100%;
  margin-top: 1rem;
  height: 2rem;
  @media screen and (min-width: 500px) {
    width: 50%;
  }
  @media screen and (min-width: 900px) {
    width: clamp(35vw, 36vw, 45vw);
    margin-top: 0;
  }
  span {
    display: ${({ isEmpty }) => (isEmpty ? 'none' : 'block')};
    cursor: pointer;
    position: absolute;
    left: 5%;
    top: 52%;
    width: 10px;
    background: ${({ theme }) => theme.colors.primary};
    height: 2px;
    transform: translateY(-50%) rotate(45deg);
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 10px;
      background: ${({ theme }) => theme.colors.primary};
      height: 2px;
      transform: translateY(-50%) rotate(-90deg);
    }
  }
  button {
    cursor: pointer;
    position: absolute;
    border-top-right-radius: 100vh;
    border-bottom-right-radius: 100vh;
    border: none;
    width: 20%;
    height: 100%;
    background: rgba(161, 161, 161, 0.2);
    right: 0;
    @media screen and (min-width: 600px) {
      width: 5rem;
    }
    img {
      vertical-align: middle;
      width: 1rem;
    }
  }
  input {
    background: linear-gradient(135deg, rgba(15, 85, 232, 0.2) 0%, rgba(157, 223, 243, 0.2) 100%);
    border-radius: 100vh;
    width: 100%;
    border: 1px solid ${({ error }) => (error ? 'red' : 'rgba(255, 255, 255, 0.2)')};
    color: ${({ theme }) => theme.colors.primary};
    text-align: left;
    padding-left: 2rem;
    @media screen and (min-width: 900px) {
      padding-left: clamp(3vw, 4vw, 5vw);
    }
    &:focus {
      border: 1px solid rgba(255, 255, 255, 0.4);
      outline: none;
    }
  }
`;

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [inputValue, setInputValue] = useState(query || '');
  const [error, setError] = useState<string>();
  const windowWidth = useWindowWidth();

  const resetInput = () => {
    setInputValue('');
    setSearchParams(undefined);
  };

  const handleSearchbarChange = (e: React.FormEvent<EventTarget>) => {
    if ((e.target as HTMLInputElement).value.length >= 3) {
      setError(undefined);
    }
    setInputValue((e.target as HTMLInputElement).value);
  };

  const searchGames = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length < 3) {
      toast('Error', {
        className: 'default',
        description: 'Input should be greater than 3 words',
        duration: 5000,
        icon: <img src={errorIco} />,
        position: windowWidth! < 1300 ? 'bottom-center' : 'top-right',
      });
      setError('Input should be greater than 3 words');

      return;
    }
    setSearchParams({ query: inputValue });
  };

  return (
    <StyledSearchbar isEmpty={inputValue.length < 1} error={error} onSubmit={searchGames}>
      <span onClick={resetInput}></span>
      <input
        type='text'
        onChange={(e) => handleSearchbarChange(e)}
        value={inputValue}
        aria-label='searchbar'
      />

      <button>
        <img src={searchIco} alt='Searchbar' />
      </button>
    </StyledSearchbar>
  );
};

export default Searchbar;
