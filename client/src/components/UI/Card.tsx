import type { Children } from '#/types/types';
import { styled } from 'styled-components';

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
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const Card = ({ children }: Children) => {
  return (
    <Wrapper>
      <div className='flex h-full w-full flex-col [&>a]:flex [&>a]:h-full [&>a]:w-full [&>a]:flex-col [&>a:hover_h1]:transition-all [&>a:hover_h1]:duration-300 [&>a:hover_h1]:ease-in-out'>
        {children}
      </div>
    </Wrapper>
  );
};

export default Card;
