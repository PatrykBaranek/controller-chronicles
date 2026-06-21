import { FallbackProps } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;

  h2 {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
  }
  .actions {
    display: flex;
    gap: 1rem;
  }
  button,
  a {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.inputGradient};
    padding: 0.8rem 1.5rem;
    border-radius: 100vw;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      filter: contrast(5);
    }
  }
`;

const PageErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <StyledWrapper>
    <h2>Something went wrong</h2>
    <p>This page ran into an error. Please try again.</p>
    <div className='actions'>
      <button onClick={resetErrorBoundary}>Try again</button>
      <Link to='/'>Back to home</Link>
    </div>
  </StyledWrapper>
);

export default PageErrorFallback;
