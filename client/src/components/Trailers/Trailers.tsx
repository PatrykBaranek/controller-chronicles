import styled from 'styled-components';
import TrailersItem from './TrailersItem';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import trailers from './Trailers.mock';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';

const StyledTrailers = styled.div`
	padding-inline: 1rem;
	margin-top: 10vw;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	position: relative;
	text-align: center;
	.splide {
		position: unset;
		&__arrows {
			position: absolute;
			top: 3%;
			right: 1%;
		}
		&__arrow {
			background: #ffffff26;
			border-radius: 7px;
			width: 1.5rem;
			height: 1.5rem;
			svg {
				fill: #fff;
				opacity: 0.9;
			}
			&--prev {
				left: -94vw;
			}
		}
	}
	@media screen and (min-width: 900px) {
		text-align: left;
		margin-top: 5vw;
		.splide__arrow--prev {
			left: -5rem;
		}
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
const Trailers = () => {
	const windowWidth = useWindowWidth();
	const isDesktop = isDesktopWidth(windowWidth);
	return (
		<StyledTrailers>
			<h3>Trailers</h3>
			{false ? (
				<Skeleton
					sx={{
						backgroundImage:
							'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
						borderRadius: '1rem ',
					}}
					animation='wave'
					variant='rounded'
					height={isDesktop ? '20vw' : '55vw'}
					width={'100%'}
				/>
			) : (
				<Splide
					options={{
						arrows: true,
						pagination: false,
						rewind: true,
						gap: '1rem',
						easing: 'ease',
						perPage: 1,
						drag: false,
						fixedWidth: '100%',
						mediaQuery: 'min',
						breakpoints: {
							900: {
								fixedWidth: '45%',
								padding: '1rem',
								perPage: 2,
							},
						},
						start: 0,
					}}
				>
					{trailers.map(
						({ game_id: id, video_trailers: videoTrailers }) => (
							<StyledSplideSlide key={id}>
								<TrailersItem trailers={videoTrailers} />
							</StyledSplideSlide>
						)
					)}
				</Splide>
			)}
		</StyledTrailers>
	);
};

export default Trailers;
