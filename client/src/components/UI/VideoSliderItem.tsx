import { Skeleton } from '@mui/material';
import styled from 'styled-components';

const StyledVideoSliderItem = styled.iframe`
	border-radius: 0.7rem;
	display: block;
	width: 100%;
	border: none;
	height: 55vw;
	@media screen and (min-width: 900px) {
		height: 20vw;
	}
`;

const VideoSliderItem = ({ link, isDesktop }: { link: string; isDesktop: boolean }) => {
	const isLinkCorrect = link.includes('embed') && link.length !== 0;
	return (
		<>
			{!isLinkCorrect ? (
				<Skeleton
					sx={{
						backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
						borderRadius: '1rem ',
					}}
					animation='wave'
					variant='rounded'
					height={isDesktop ? '20vw' : '55vw'}
					width={'100%'}
				/>
			) : (
				<StyledVideoSliderItem
					src={link}
					sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation'
					allowFullScreen
					allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				></StyledVideoSliderItem>
			)}
		</>
	);
};

export default VideoSliderItem;
