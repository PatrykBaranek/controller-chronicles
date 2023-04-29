import searchIco from '#/assets/searchIco.svg';
import styled from 'styled-components';
import { useRef, useState } from 'react';
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
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const onSearchbarClick = () => {
    ref.current?.focus();
    setIsClicked(prev => !prev);
  };

  return (
    <StyledSearchbar
      isClicked={isClicked}
      onClick={onSearchbarClick}
    >
      <img
        src={searchIco}
        alt='Searchbar'
      />
      <input
        type='text'
        ref={ref}
        aria-label='searchbar'
      />
    </StyledSearchbar>
  );
};

export default Searchbar;
