import styled from 'styled-components';

type trailer = {
	title: string;
	thumbnail: string;
	author: string;
	link: string;
};
type Props = {
	trailers: trailer[];
};

const StyledTrailersItem = styled.iframe`
	border-radius: 0.7rem;
	display: block;
	width: 100%;
	border: none;
	height: 55vw;
	@media screen and (min-width: 900px) {
		height: 20vw;
	}
`;

const TrailersItem = ({ trailers }: Props) => {
	const trailer = trailers[0];
	return (
		<StyledTrailersItem
			src={trailer.link}
			allowFullScreen
			allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
		></StyledTrailersItem>
	);
};

export default TrailersItem;
