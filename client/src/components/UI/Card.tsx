import { Children } from '#/types/types';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  padding: 1px;
  border-radius: 1rem;
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out;
  &:hover {
    transform: scale(1.04) translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows?.softGlow};
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

const Card = ({ children }: Children) => {
  return (
    <Wrapper>
      <StyledCard>{children}</StyledCard>
    </Wrapper>
  );
};

export default Card;
