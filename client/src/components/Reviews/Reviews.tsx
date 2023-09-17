import styled from 'styled-components';
import ReviewsItem from './ReviewsItems';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import reviews from './Reviews.mock';

const StyledReviews = styled.div`
	padding-inline: 1rem;
	margin-top: 10vw;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	text-align: center;
	@media screen and (min-width: 900px) {
		text-align: left;
		margin-top: 5vw;
	}
	h3 {
		font-size: 1.2rem;
		font-weight: ${({ theme }) => theme.fontWeights.semiBold};
		margin-bottom: 1rem;
	}
`;
const StyledSplideSlide = styled(SplideSlide)`
	@media screen and (min-width: 900px) {
		padding-block: 1rem;
	}
`;
const Reviews = () => {
	return (
		<StyledReviews>
			<h3>Reviews</h3>
			{false ? (
				<Skeleton
					sx={{
						backgroundImage:
							'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
						borderRadius: '1rem ',
					}}
					animation='wave'
					variant='rounded'
					height={'200px'}
					width={'100%'}
				/>
			) : (
				<Splide
					options={{
						arrows: false,
						pagination: false,
						autoplay: false,
						// interval: 4000,
						rewind: true,
						gap: '1rem',
						easing: 'ease',
						perPage: 1,
						fixedWidth: '100%',
						mediaQuery: 'min',
						breakpoints: {
							900: {
								fixedWidth: '30%',
								padding: '1rem',
							},
							1500: {
								fixedWidth: '30%',
								perPage: 4,
							},
						},
						start: 0,
					}}
				>
					{reviews.map(
						({ id, background_image: backgroundImage, url }) => (
							<StyledSplideSlide key={id}>
								<ReviewsItem
									img={backgroundImage}
									id={id}
									url={url}
								/>
							</StyledSplideSlide>
						)
					)}
				</Splide>
			)}
		</StyledReviews>
	);
};

export default Reviews;
