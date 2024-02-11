import useStore from '#/store/store';
import { useSignOut } from 'react-auth-kit';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

type NavbarLink = {
  text: string;
  icon: string;
  isLogoutButton?: boolean;
  isFaq?: boolean;
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

  &:hover {
    background: ${({ isActive }) =>
      isActive
        ? ''
        : `linear-gradient(
      131.88deg,
      rgba(0, 235, 255, 0) 0,
      rgba(167, 62, 231, 0.15) 14.48%,
      rgba(0, 235, 255, 0) 70%
    );`};
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
    pointer-events: none;
  }
  &:not(:last-of-type) div::after {
    display: none;
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  width: 30%;
  @media screen and (min-width: 900px) {
    width: 100%;
  }
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
    @media screen and (min-width: 900px) {
      width: 100%;
      justify-content: flex-start;
    }
    span {
      width: 1.5rem;
      height: 1.5rem;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      filter: invert(90%) sepia(13%) saturate(181%) hue-rotate(201deg) brightness(104%)
        contrast(92%);
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
      position: relative;
      margin-left: -5px;
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
    p {
      margin-left: -3px;
    }
    img {
      opacity: 1;
      filter: invert(100%) sepia(4%) saturate(10%) hue-rotate(66deg) brightness(103%) contrast(100%);
    }
    img[alt='Games icon'] {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-48%, -56%);
    }
    img[alt='Login icon'],
    img[alt='Log out icon'],
    img[alt='FAQ icon'],
    img[alt='Profile icon'] {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -56%);
    }
  }
`;
const NavbarLink = ({ text, icon, isLogoutButton, isFaq }: NavbarLink) => {
  const { pathname } = useLocation();
  const { toggleMenuOpen } = useStore();
  const logout = useSignOut();

  const isLinkActive = () => {
    if (text.toLowerCase() === 'home') {
      return pathname === '/';
    }
    if (text.toLowerCase() === 'collections') {
      return pathname === `/profile/${text.toLowerCase()}`;
    }

    return pathname === `/${text.toLocaleLowerCase()}`;
  };

  const onLinkClick = () => {
    toggleMenuOpen();
    if (isLogoutButton) {
      toast('Logged out!', {
        className: 'default',
        duration: 5000,
        position: 'top-center',
        style: {
          gap: '1rem',
        },
      });

      logout();
    }

    if (isFaq) {
      window.open(import.meta.env.VITE_DOCUMENTATION_URL, '_blank');
    }
  };

  const correctLocation = () => {
    if (
      text.toLowerCase() === 'home' ||
      text.toLowerCase() === 'logout' ||
      text.toLowerCase() === 'faq'
    ) {
      return '';
    }
    if (text.toLowerCase() === 'collections') {
      return `profile/${text.toLowerCase()}`;
    }

    return text.toLowerCase();
  };

  return (
    <StyledNavbarLink isActive={isLinkActive()}>
      <StyledWrapper>
        <NavLink
          onClick={onLinkClick}
          className={() => (isLinkActive() && !isLogoutButton ? 'active' : '')}
          to={`/${correctLocation()}`}
        >
          <span>
            <img src={icon} alt={`${text} icon`} />
          </span>
          <p>{text}</p>
        </NavLink>
      </StyledWrapper>
    </StyledNavbarLink>
  );
};

export default NavbarLink;
