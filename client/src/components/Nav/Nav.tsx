import styled from 'styled-components';
import NavMenu from './NavMenu';
import useStore from '#/store/store';

type NavStyleProps = {
  isOpen: boolean | null;
};
const StyledNav = styled.nav<NavStyleProps>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-200%')});
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out 0.2s;
  background: linear-gradient(
      234.73deg,
      rgba(60, 112, 85, 0.45) 12.85%,
      rgba(34, 23, 56, 0.75) 61.83%
    ),
    rgba(34, 20, 117, 0.4);
  backdrop-filter: blur(6px);
  @media screen and (min-width: 900px) {
    background: none;
    width: 30vw;
    position: unset;
    transform: unset;
    opacity: unset;
    backdrop-filter: none;
  }
  @media screen and (min-width: 1050px) {
    width: 18vw;
  }
`;

const Nav = () => {
  const { isMenuOpen } = useStore();

  return <StyledNav isOpen={isMenuOpen}>{<NavMenu />}</StyledNav>;
};

export default Nav;
