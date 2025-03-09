import useWindowWidth from '../../hooks/useWindowWidth';
import { Children } from '../../types/types';
import isDesktopWidth from '../../utils/isDesktopWidth';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const StyledCard = styled.div`
  overflow: hidden;
  position: relative;
  padding: 1px;
  transition: all 0.2s ease-in-out;
  padding-bottom: 5rem;
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
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;
const StyledOverlay = styled.span`
  background: linear-gradient(131.88deg, #a73ee7 0%, transparent 80%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  opacity: 0.1;
  pointer-events: none;
`;
const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  align-items: center;
  @media screen and (min-width: 900px) {
    min-width: 25vw;
    padding-inline: 3rem;
    padding-bottom: 1rem;
  }
`;

type Props = {
  children: Children;
  onSubmit: () => void;
};

const Form = ({ children, onSubmit }: Props) => {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);
  const currentLocation = useLocation().pathname.slice(1);
  const isLoginPage = currentLocation === 'login';

  return isDesktop ? (
    <StyledCard>
      <h1>{isLoginPage ? 'Log in' : 'Sign up'}</h1>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
      <StyledOverlay></StyledOverlay>
    </StyledCard>
  ) : (
    <>
      <h1>{isLoginPage ? 'Log in' : 'Sign up'}</h1>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
    </>
  );
};

export default Form;
