import styled from 'styled-components';
import homeIco from '#/assets/homeIco.svg';
import gamepadIco from '#/assets/gamepadIco.svg';
import podcastIco from '#/assets/podcastsIco.svg';
import NavbarLink from '../UI/NavbarLink';

const StyledNavMenu = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 15vh;
  @media screen and (min-width: 900px) {
    padding-top: 2rem;
  }
`;

const NavMenu = () => {
  return (
    <StyledNavMenu>
      <NavbarLink
        icon={homeIco}
        text='Home'
      />
      <NavbarLink
        icon={gamepadIco}
        text='Games'
      />
      <NavbarLink
        icon={podcastIco}
        text='Podcasts'
      />
    </StyledNavMenu>
  );
};

export default NavMenu;
