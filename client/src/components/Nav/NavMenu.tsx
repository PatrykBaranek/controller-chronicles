import collectionIco from '#/assets/collectionIco.svg';
import faqIco from '#/assets/faqIco.svg';
import gamepadIco from '#/assets/gamepadIco.svg';
import homeIco from '#/assets/homeIco.svg';
import loggedIco from '#/assets/loggedIco.svg';
import loginIco from '#/assets/loginIcon.svg';
import podcastIco from '#/assets/podcastsIco.svg';
import { useIsAuthenticated } from 'react-auth-kit';
import styled from 'styled-components';
import NavbarLink from '../UI/NavbarLink';

const StyledNavMenu = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 15vh;
  & li:nth-of-type(3) {
    margin-bottom: 2.5rem;
  }
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
    height: unset;
  }
`;

const NavMenu = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <StyledNavMenu>
      <NavbarLink icon={homeIco} text='Home' />
      <NavbarLink icon={gamepadIco} text='Games' />
      <NavbarLink icon={podcastIco} text='Podcasts' />
      {!isAuthenticated() ? (
        <NavbarLink icon={loginIco} text={'Login'} />
      ) : (
        <>
          <NavbarLink icon={loginIco} text={'Profile'} />
          <NavbarLink icon={collectionIco} text={'Collections'} />
          <NavbarLink icon={loggedIco} text={'Logout'} isLogoutButton={true} />
        </>
      )}
      <NavbarLink icon={faqIco} text={'FAQ'} isFaq={true} />
    </StyledNavMenu>
  );
};

export default NavMenu;
