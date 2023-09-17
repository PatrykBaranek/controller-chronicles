import styled from 'styled-components';
import NewReleases from '#/components/NewReleases/NewReleases';
import Bestsellers from '#/components/Bestsellers/Bestsellers';
import Reviews from '#/components/Reviews/Reviews';
import Trailers from '#/components/Trailers/Trailers';

const StyledHome = styled.div`
	width: 100%;
	min-height: 100vh;
`;

const Home = () => {
	return (
		<StyledHome>
			<NewReleases />
			<Bestsellers />
			<Reviews />
			<Trailers />
		</StyledHome>
	);
};

export default Home;
