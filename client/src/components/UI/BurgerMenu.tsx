import useStore from '#/store/store';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const StyledBurgerMenu = styled.div<{ isOpen: boolean }>`
  cursor: pointer;
  width: 1.18rem;
  z-index: 10;
  height: 1rem;
  @media screen and (min-width: 900px) {
    display: none;
  }
  span {
    position: relative;
    width: 50%;
    height: ${({ isOpen }) => (isOpen ? '0' : '2px')};
    top: 50%;
    transform: translateY(-50%);
    background-color: #fff;
    display: block;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    &::before {
      content: '';
      position: absolute;
      background-color: #fff;
      border-radius: 10px;
      width: 200%;
      height: 2px;
      top: ${({ isOpen }) => (isOpen ? '1px' : 'calc(50% - 5px)')};
      transform: translateY(-50%);
      transform: rotate(${({ isOpen }) => (isOpen ? '45deg' : '')});
      transition: all 0.5s ease-in-out;
    }
    &::after {
      content: '';
      position: absolute;
      background-color: #fff;
      border-radius: 10px;
      width: 200%;
      height: 2px;
      top: ${({ isOpen }) => (isOpen ? '1px' : 'calc(50% + 5px)')};
      transition: all 0.5s ease-in-out;
      transform: translateY(-50%);
      transform: rotate(${({ isOpen }) => (isOpen ? '-45deg' : '')});
    }
  }
`;

const BurgerMenu = () => {
  const { isMenuOpen, toggleMenuOpen } = useStore();

  return (
    <StyledBurgerMenu isOpen={isMenuOpen} onClick={toggleMenuOpen}>
      <span></span>
    </StyledBurgerMenu>
  );
};

export default BurgerMenu;
