import { getLastMonthYoutubeVideos } from '#/api/gamesApi';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { getLastMonthYoutubeVideos } from '#/api/gamesApi';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { Skeleton } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import VideoSliderItem from './VideoSliderItem';

type Props = {
	variant: 'review' | 'trailer';
	heading: string;
};
import { useQuery } from 'react-query';
import styled from 'styled-components';
import VideoSliderItem from './VideoSliderItem';

type Props = {
	variant: 'review' | 'trailer';
	heading: string;
};

const StyledVideoSlider = styled.div`
const StyledVideoSlider = styled.div`
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
const VideoSlider = ({ variant, heading }: Props) => {
const VideoSlider = ({ variant, heading }: Props) => {
	const windowWidth = useWindowWidth();
	const isDesktop = isDesktopWidth(windowWidth);
	const { data, isLoading, isError, isFetched } = useQuery([variant], () =>
		getLastMonthYoutubeVideos(variant)
	);

	const { data, isLoading, isError, isFetched } = useQuery([variant], () =>
		getLastMonthYoutubeVideos(variant)
	);

	return (
		<StyledVideoSlider>
			<h3>{heading}</h3>
			{isLoading || isError ? (
		<StyledVideoSlider>
			<h3>{heading}</h3>
			{isLoading || isError ? (
				<Skeleton
					sx={{
						backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
						backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
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
					{isFetched &&
						data?.map(({ link }, idx) => (
							<StyledSplideSlide key={idx}>
								<VideoSliderItem isDesktop={isDesktop} link={link} />
							</StyledSplideSlide>
						))}
						))}
				</Splide>
			)}
		</StyledVideoSlider>
		</StyledVideoSlider>
	);
};

export default VideoSlider;
export default VideoSlider;
