import { authClient } from '../../api/auth-client';
import { StyledButton } from '../../pages/Login';
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
  const handleClick = async () => {
    if (isAuth) {
      await authClient.signOut();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };
  return (
    <StyledAuthButton onClick={handleClick}>{isAuth ? 'Sign out' : 'Log in'}</StyledAuthButton>
  );
};

export default AuthButton;
