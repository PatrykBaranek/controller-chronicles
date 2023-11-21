import { StyledButton } from '#/pages/Login';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  const signOut = useSignOut();
  const handleClick = () => {
    if (isAuth) {
      signOut();
    } else {
      navigate('/login');
    }
  };
  return (
    <StyledAuthButton onClick={handleClick}>{isAuth ? 'Sign out' : 'Log in'}</StyledAuthButton>
  );
};

export default AuthButton;
