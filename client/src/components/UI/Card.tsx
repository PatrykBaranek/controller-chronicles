import { Children } from '#/types/types';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  /* background: ${({ theme }) => theme.colors.cardGradient};
  border-radius: 1rem; */
  position: relative;
  padding: 1px;
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
`;

const Card = ({ children }: Children) => {
  return (
    <Wrapper>
      <StyledCard>{children}</StyledCard>
    </Wrapper>
  );
};

export default Card;
