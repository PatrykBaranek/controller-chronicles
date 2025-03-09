import { Children } from '../../types/types';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  padding: 1px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;
const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  a {
    display: inherit;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  a:hover h1 {
    transition: all 0.3s ease-in-out;
    background-image: ${({ theme }) => theme.colors.secondaryGradient};
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

const Card = ({ children }: { children: Children }) => {
  return (
    <Wrapper>
      <StyledCard>{children}</StyledCard>
    </Wrapper>
  );
};

export default Card;
