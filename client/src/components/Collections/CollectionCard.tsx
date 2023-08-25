import styled from 'styled-components';

type Props = {
	length: number;
};

const StyledCollectionCard = styled.div<Props>`
	border-radius: 0.7rem;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
	}
	@media screen and (min-width: 1200px) {
		display: flex;
		transition: 0.4s ease-out;
		position: relative;
		left: 0px;
		cursor: pointer;
		&:not(:first-child) {
			margin-left: -50px;
		}
		&:hover {
			transform: ${({ length }) =>
				length > 1 ? 'translateY(-8px)' : ''};
			transition: 0.4s ease-out;
		}
		&:hover ~ & {
			position: relative;
			left: 30px;
			transition: 0.4s ease-out;
		}
		img {
			border-radius: 1rem;
			width: ${({ length }) => `${18 - 1.5 * length}vw`};
		}
	}
`;

const CollectionCard = ({ img, length }: { img: string; length: number }) => {
	console.log(length);
	return (
		<StyledCollectionCard length={length}>
			<img src={img} alt='' />
		</StyledCollectionCard>
	);
};

export default CollectionCard;
