import styled from 'styled-components';
import BurgerMenu from '../UI/BurgerMenu';
import logo from '#/assets/logo.svg';
import Searchbar from './Searchbar';
import useWindowWidth from '../../hooks/useWindowWidth';
import isLocationSearchable from '../../utils/isLocationSearchable';
import { useLocation } from 'react-router-dom';
import filterIcon from '#/assets/filterIcon.svg';
import isDesktopWidth from '../../utils/isDesktopWidth';
import Nav from '../Nav/Nav';
import useStore from '#/store/store';
import FilterDrawer from '../FilterDrawer/FilterDrawer';

const StyledHeader = styled.header`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 1.5rem 2.18rem;
	overflow: hidden;
	@media screen and (min-width: 900px) {
		padding-bottom: 0;
	}
`;
const StyledTopSection = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 1fr;
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
const StyledFilterIcon = styled.img`
	width: 1.18rem;
	align-self: center;
	justify-self: end;
	cursor: pointer;
`;
const StyledLogo = styled.img`
	width: clamp(10.6rem, 10vw, 18.75rem);
`;

const Header = () => {
	const windowWidth = useWindowWidth();
	const { pathname: location } = useLocation();
	const { toggleFiltersOpen } = useStore();

	return (
		<StyledHeader>
			{!isDesktopWidth(windowWidth) && <Nav />}
			<StyledTopSection>
				<BurgerMenu />
				<StyledLogo src={logo} alt='Controller chronicles logo' />
				{isDesktopWidth(windowWidth) && isLocationSearchable(location) && <Searchbar />}
				{isLocationSearchable(location) && (
					<>
						<StyledFilterIcon src={filterIcon} alt='Filters' onClick={toggleFiltersOpen} />
						<FilterDrawer />
					</>
				)}
			</StyledTopSection>
			{!isDesktopWidth(windowWidth) && isLocationSearchable(location) && <Searchbar />}
		</StyledHeader>
	);
};

export default Header;
