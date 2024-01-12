import styled from 'styled-components';

type Props = {
  size?: string;
};

const StyledWrapper = styled.div``;

const StyledSpinner = styled.svg<Props>`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: ${({ size }) => (size?.length ? size : '100px')};
  height: ${({ size }) => (size?.length ? size : '100px')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);

  & .path {
    stroke: #a73ee7;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg) translate(-30%, -50%);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Spinner = ({ size }: Props) => (
  <StyledWrapper>
    <StyledSpinner size={size} viewBox='0 0 50 50'>
      <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='2' />
    </StyledSpinner>
  </StyledWrapper>
);

export default Spinner;
