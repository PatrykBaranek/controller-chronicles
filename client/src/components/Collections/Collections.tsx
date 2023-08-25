import styled from 'styled-components';
import collections from './Collections.mock';
import useWindowWidth from '#/hooks/useWindowWidth';
import CollectionsMobile from './CollectionsMobile';
import CollectionsDesktop from './CollectionsDesktop';

const StyledCollectionsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-inline: 1.625rem;
	h1 {
		font-size: clamp(1.8rem, 4vw, 2.1rem);
	}
	@media screen and (min-width: 600px) {
		padding-inline: 1rem;
	}
	@media screen and (min-width: 900px) {
		padding-inline: 2rem;
		width: 80%;
		justify-content: unset;
		margin-top: 2rem;
	}
`;

const StyledCollectionWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-top: 2rem;
	gap: 1.6rem;
	h3 {
		margin-bottom: 1rem;
		font-size: 1.1rem;
		font-weight: ${({ theme }) => theme.fontWeights.semiBold};
		color: ${({ theme }) => theme.colors.secondary};
	}
`;
const StyledCardContainer = styled.div`
	width: 100%;
	display: flex;
	margin-left: 1rem;
	@media screen and (min-width: 1200px) {
		margin-bottom: 1rem;
	}
	.splide__arrow {
		background: #00eaff6f;
	}
`;

const Collections = () => {
	const windowWidth = useWindowWidth();
	const isDesktop = windowWidth && windowWidth >= 1200;
	return (
		<StyledCollectionsContainer>
			<h1>Your Collections</h1>
			<StyledCollectionWrapper>
				{collections.map(({ _id, name, games }, id) => (
					<div key={_id + id}>
						<h3>{name}</h3>
						<StyledCardContainer>
							{!isDesktop ? (
								<CollectionsMobile games={games} />
							) : (
								<CollectionsDesktop
									games={games}
									length={games.length}
								/>
							)}
						</StyledCardContainer>
					</div>
				))}
			</StyledCollectionWrapper>
		</StyledCollectionsContainer>
	);
};

export default Collections;
