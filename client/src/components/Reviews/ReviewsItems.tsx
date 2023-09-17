import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';

type Props = {
	id: number;
	img: string;
	url: string;
};

const StyledReviewsItem = styled(Link)`
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

const ReviewsItem = ({ img, id, url }: Props) => {
	return (
		<Card>
			<StyledReviewsItem to={url}>
				<img src={img} />
				<StyledOverlay>
					<StyledCount>{id}</StyledCount>
				</StyledOverlay>
			</StyledReviewsItem>
		</Card>
	);
};

export default ReviewsItem;
