import { Children } from '#/types/types';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cardGradient};
  border-radius: 1rem;
  padding: 1px;
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
