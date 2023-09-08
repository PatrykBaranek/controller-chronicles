import { getBestsellers } from '#/api/gamesApi';
import { isError, useQuery } from 'react-query';
import styled from 'styled-components';
import BestsellersItem from './BestsellersItem';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Bestseller } from '#/types/types';
import { useState } from 'react';

const StyledBestsellers = styled.div`
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
const Bestsellers = () => {
	const [bestsellers, setBestsellers] = useState<Bestseller[]>();
	const { isLoading, isError } = useQuery(
		['bestsellers'],
		() => getBestsellers(),
		{
			onSuccess: (data) => setBestsellers(data.games.slice(0, 35)),
		}
	);

	return (
		<StyledBestsellers>
			<h3>Bestsellers</h3>
			{isLoading || isError ? (
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
						autoplay: true,
						interval: 4000,
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
					{bestsellers?.map((bestseller, idx) => (
						<StyledSplideSlide key={bestseller.link}>
							<BestsellersItem
								img={bestseller.img}
								price={bestseller.price}
								name={bestseller.name}
								link={bestseller.link}
								idx={idx}
							/>
						</StyledSplideSlide>
					))}
				</Splide>
			)}
		</StyledBestsellers>
	);
};

export default Bestsellers;
