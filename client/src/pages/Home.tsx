import styled from 'styled-components';
import NewReleases from '#/components/NewReleases/NewReleases';
import Bestsellers from '#/components/Bestsellers/Bestsellers';

const StyledHome = styled.div`
	width: 100%;
	min-height: 100vh;
`;

const Home = () => {
	return (
		<StyledHome>
			<NewReleases />
			<Bestsellers />
		</StyledHome>
	);
};

export default Home;
