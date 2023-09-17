import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled(Link)`
	color: #00ebff;
	font-weight: ${({ theme }) => theme.fontWeights.semiBold};
	font-size: 1.05rem;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.05);
	}
`;

const CollectionsButton = ({ text }: { text: string }) => {
	return <StyledButton to={'collections'}>{text}</StyledButton>;
};

export default CollectionsButton;
