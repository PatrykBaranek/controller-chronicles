import useStore from '#/store/store';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

type NavbarLink = {
  text: string;
  icon: string;
};

type StyledLink = {
  isActive: boolean;
};

const StyledNavbarLink = styled.li<StyledLink>`
  display: flex;
  justify-content: center;
  height: 3.5rem;
  position: relative;
  @media screen and (min-width: 900px) {
    justify-content: flex-start;
    padding-left: 1.25rem;
  }
  &::before {
    display: ${({ isActive }) => (isActive ? 'inline' : 'none')};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    height: 50%;
    width: 80%;
    background: ${({ theme }) => theme.colors.activeGradient};
  }
  &:not(:last-of-type) div::after {
    display: none;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  &::before {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    height: 1px;
    width: 90%;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50.4%,
      rgba(255, 255, 255, 0) 96.77%
    );
  }
  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    height: 1px;
    width: 80%;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.1) 50.4%,
      rgba(255, 255, 255, 0) 96.77%
    );
  }
  a {
    display: inherit;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.9rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    span {
      width: 1.5rem;
      height: 1.5rem;
    }
    img {
      filter: invert(90%) sepia(13%) saturate(181%) hue-rotate(201deg)
        brightness(104%) contrast(92%);
      opacity: 0.6;
    }
  }
  a.active {
    color: white;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 100vh;
      padding: 4px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 100vh;
        padding: 1px;
        background: ${({ theme }) => theme.colors.secondaryGradient};
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }
    }
    img {
      opacity: 1;
      filter: invert(100%) sepia(4%) saturate(10%) hue-rotate(66deg)
        brightness(103%) contrast(100%);
    }
  }
`;
const NavbarLink = ({ text, icon }: NavbarLink) => {
  const { pathname } = useLocation();
  const { toggleMenuOpen } = useStore();

  const isLinkActive = () => {
    if (text.toLowerCase() === 'home') {
      return pathname === '/';
    } else {
      return pathname === `/${text.toLocaleLowerCase()}`;
    }
  };
  return (
    <StyledNavbarLink isActive={isLinkActive()}>
      <StyledWrapper>
        <NavLink
          onClick={toggleMenuOpen}
          className={({ isActive }) => (isActive ? 'active' : '')}
          to={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`}
        >
          <span>
            <img
              src={icon}
              alt={`${icon} icon`}
            />
          </span>
          {text}
        </NavLink>
      </StyledWrapper>
    </StyledNavbarLink>
  );
};

export default NavbarLink;
