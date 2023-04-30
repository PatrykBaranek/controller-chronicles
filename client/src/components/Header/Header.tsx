import styled from 'styled-components';
import BurgerMenu from '../UI/BurgerMenu';
import logo from '#/assets/logo.svg';
import avatar from '#/assets/avatar.svg';
import Searchbar from './Searchbar';
import useWindowWidth from '../../hooks/useWindowWidth';
import isLocationSearchable from '../utils/isLocationSearchable';
import { useLocation } from 'react-router-dom';
import Filter from './Filter/Filter';
import isDesktopWidth from '../utils/isDesktopWidth';
const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1.31rem 2.18rem;
  overflow: hidden;
`;
const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 1rem;
  height: 50%;
  position: relative;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    height: 1px;
    width: 100%;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50.4%,
      rgba(255, 255, 255, 0) 96.77%
    );
  }
`;
const StyledCtaSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  align-items: center;
  width: 100%;
  height: 50%;
  position: relative;
  padding-bottom: 1.2rem;
  @media screen and (min-width: 900px) {
    padding-block: 1.7rem;
  }
  &::before {
    position: absolute;
    bottom: 0;
    left: 50%;
    content: '';
    transform: rotate(180deg) translateX(50%);
    height: 50%;
    width: 80%;
    background: ${({ theme }) => theme.colors.activeGradient};
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    height: 1px;
    width: 100%;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50.4%,
      rgba(255, 255, 255, 0) 96.77%
    );
  }
`;
const StyledLogo = styled.img`
  width: clamp(10.6rem, 10vw, 18.75rem);
`;

const Header = () => {
  const windowWidth = useWindowWidth();
  const { pathname: location } = useLocation();
  return (
    <StyledHeader>
      <StyledTopSection>
        <BurgerMenu />
        <StyledLogo
          src={logo}
          alt='Controller chronicles logo'
        />
        {isDesktopWidth(windowWidth) && isLocationSearchable(location) && (
          <Searchbar />
        )}
        <img
          src={avatar}
          alt='User avatar'
        />
      </StyledTopSection>
      {isLocationSearchable(location) && (
        <StyledCtaSection>
          {!isDesktopWidth(windowWidth) && <Searchbar />}
          <Filter />
        </StyledCtaSection>
      )}
    </StyledHeader>
  );
};

export default Header;
