import { useEffect, useRef } from 'react';
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

const VideoSliderItem = ({ link }: { link: string }) => {
	return (
		<StyledVideoSliderItem
			src={link}
			sandbox='allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation allow-presentation'
			allowFullScreen
			allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
		></StyledVideoSliderItem>
	);
};

export default VideoSliderItem;
