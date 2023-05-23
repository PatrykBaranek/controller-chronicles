import searchIco from '#/assets/searchIco.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useStore from '#/store/store';
import { getGamesBySearchQuery } from '#/api/gamesApi';
import { useQuery } from 'react-query';
import useDebounce from '#/hooks/useDebounce';
type StyledSearchBarProps = {
  isClicked: boolean;
  onSearchbarClick?: () => void;
};

const StyledSearchbar = styled.div<StyledSearchBarProps>`
  display: flex;
  justify-content: left;
  position: relative;
  border-radius: 100vh;
  width: ${({ isClicked }) => (isClicked ? '90%' : '2rem')};
  height: 2rem;
  @media screen and (min-width: 900px) {
    width: clamp(40vw, 40vw, 100vw);
  }
  img {
    width: 0.8rem;
    aspect-ratio: 1;
    position: absolute;
    top: 50%;
    pointer-events: none;
    left: ${({ isClicked }) => (isClicked ? '6vw' : '50%')};
    transform: translate(-50%, -50%);
    @media screen and (min-width: 600px) {
      left: ${({ isClicked }) => (isClicked ? '5vw' : '50%')};
    }
    @media screen and (min-width: 900px) {
      left: 2vw;
    }
  }
  input {
    background: linear-gradient(
      135deg,
      rgba(15, 85, 232, 0.2) 0%,
      rgba(157, 223, 243, 0.2) 100%
    );
    border-radius: 100vh;
    width: inherit;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: width 0.4s ease-in-out;
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
    &:focus {
      border: 1px solid rgba(255, 255, 255, 0.4);
      outline: none;
    }
  }
`;

const Searchbar = () => {
  const { storeGames, changeSearchbarVisible } = useStore();
  const [isClicked, setIsClicked] = useState(false);
  const [isSearchbarTouched, setIsSearchbarTouched] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);

  const { data: games, refetch } = useQuery(
    ['/games', debouncedInputValue],
    () => getGamesBySearchQuery(debouncedInputValue),
    {
      enabled: false,
    }
  );

  const onSearchbarClick = (e: React.FormEvent<EventTarget>) => {
    setIsClicked(true);
  };

  const handleSearchbarChange = (e: React.FormEvent<EventTarget>) => {
    setInputValue((e.target as HTMLInputElement).value);
    if ((e.target as HTMLInputElement).value.length >= 3) {
      setIsSearchbarTouched(true);
    }
  };
  useEffect(() => {
    !!games && storeGames(games.results);
    if (isSearchbarTouched && inputValue.length >= 3) {
      changeSearchbarVisible(false);
      refetch();
    }
    if (isSearchbarTouched && inputValue.length === 0) {
      changeSearchbarVisible(true);
      refetch();
    }
  }, [games, inputValue]);
  return (
    <StyledSearchbar
      isClicked={isClicked}
      onClick={e => onSearchbarClick(e)}
    >
      <img
        src={searchIco}
        alt='Searchbar'
      />
      <input
        type='text'
        onChange={e => handleSearchbarChange(e)}
        value={inputValue}
        onBlur={() => inputValue === '' && setIsClicked(false)}
        aria-label='searchbar'
      />
    </StyledSearchbar>
  );
};

export default Searchbar;
