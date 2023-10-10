import styled from 'styled-components';
import homeIco from '#/assets/homeIco.svg';
import gamepadIco from '#/assets/gamepadIco.svg';
import podcastIco from '#/assets/podcastsIco.svg';
import loginIco from '#/assets/loginIcon.svg';
import loggedIco from '#/assets/loggedIco.svg';
import NavbarLink from '../UI/NavbarLink';
import { useIsAuthenticated } from 'react-auth-kit';
import avatar from '#/assets/avatar.svg';

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
					<NavbarLink icon={avatar} text={'Profile'} />
					<NavbarLink icon={loggedIco} text={'Logout'} isLogoutButton={true} />
				</>
			)}
		</StyledNavMenu>
	);
};

export default NavMenu;
