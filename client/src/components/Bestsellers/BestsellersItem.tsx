import { type Bestseller } from '#/types/types';
import styled from 'styled-components';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import getGameIdFromUrl from '#/utils/getGameIdFromUrl';

const StyledBestsellersItem = styled(Link)`
	border-radius: 0.7rem;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
	}
`;

const StyledOverlay = styled.span`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 50%;
	transform: translateX(-50%);
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, 0.4) 30%,
		rgba(255, 255, 255, 0) 50%
	);
	border-radius: 1rem;
	color: white;
	span {
		display: flex;
		width: 80%;
		justify-content: center;
		position: absolute;
		bottom: 15%;
		left: 50%;
		transform: translateX(-50%);
		font-weight: ${({ theme }) => theme.fontWeights.semiBold};
		font-size: clamp(0.7rem, 2vw, 0.9rem);
		text-align: center;
	}
`;
const StyledCount = styled.p`
	color: white;
	position: absolute;
	bottom: 7%;
	right: 5%;
	font-size: clamp(0.7rem, 2vw, 0.9rem);
	font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const BestsellersItem = ({
	img,
	link,
	name,
	idx,
}: Bestseller & { idx: number }) => {
	const gameId = getGameIdFromUrl(link);
	return (
		<Card>
			<StyledBestsellersItem to={link}>
				<img
					src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src = `${img}`;
					}}
					alt={`${name} image`}
				/>
				<StyledOverlay>
					<span>
						<p>{name}</p>
					</span>
					<StyledCount>{idx + 1}</StyledCount>
				</StyledOverlay>
			</StyledBestsellersItem>
		</Card>
	);
};

export default BestsellersItem;
