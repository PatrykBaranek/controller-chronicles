import { StyledButton } from '#/pages/Login';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

const StyledAuthButton = styled(StyledButton)`
  width: unset;
  font-size: unset;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const AuthButton = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (isAuth) {
      // signOut(); //TODO: implement this
    } else {
      navigate('/login');
    }
  };
  return (
    <StyledAuthButton onClick={handleClick}>{isAuth ? 'Sign out' : 'Log in'}</StyledAuthButton>
  );
};

export default AuthButton;
