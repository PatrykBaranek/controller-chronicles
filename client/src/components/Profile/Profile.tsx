import { StyledButton } from '#/pages/Login';
import styled from 'styled-components';
import avatar from '#/assets/avatar.svg';
import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';

type ButtonProps = {
	isDelete: boolean;
};

export const StyledContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-inline: clamp(1.625rem, 5vw, 3.25rem);
	@media screen and (min-width: 900px) {
		width: 40vw;
		overflow: hidden;
		position: relative;
		padding: 1px;
		transition: all 0.2s ease-in-out;
		padding-block: 3rem;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 1rem;
			padding: 1px;
			background: linear-gradient(
				180deg,
				rgba(255, 255, 255, 0.2) 0%,
				rgba(255, 255, 255, 0.2) 30%,
				rgba(255, 255, 255, 0) 100%
			);
			mask: linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			mask-composite: xor;
			mask-composite: exclude;
			pointer-events: none;
		}
		&::after {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			content: '';
			height: 100%;
			width: 100%;
			opacity: 1;
			pointer-events: none;
			opacity: 0.15;
			background: linear-gradient(
				180deg,
				#48319d 0%,
				#48319d7d 30%,
				rgba(255, 255, 255, 0) 100%
			);
		}
	}
	@media screen and (min-width: 1200px) {
		width: 50%;
		justify-content: unset;
		align-items: unset;
		margin-top: 2rem;
		height: 80%;
	}
`;
const StyledProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.5rem;
	margin-bottom: 2.5rem;
	img {
		width: clamp(130px, 10vw, 160px);
	}
`;
const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 2rem;
`;
const StyledFormButton = styled(StyledButton)<ButtonProps>`
	font-size: 15px;
	width: 60%;
	font-weight: ${({ theme }) => theme.fontWeights.medium};
	color: ${({ theme, isDelete }) => isDelete && theme.colors.red};
`;
const Profile = () => {
	return (
		<StyledContainer>
			<StyledProfileInfo>
				<img src={avatar} alt='' />
				<h3>@nickname</h3>
			</StyledProfileInfo>
			<StyledForm>
				<StyledFormButton isDelete={false}>
					Change your password
				</StyledFormButton>
				<StyledFormButton isDelete>Delete account</StyledFormButton>
			</StyledForm>
		</StyledContainer>
	);
};

export default Profile;
