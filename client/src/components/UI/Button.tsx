import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 2rem;
  padding: 0.5rem 2rem;
  border: 1px solid #ffffff34;
  background: linear-gradient(
    135deg,
    rgba(15, 85, 232, 0.2) 0%,
    rgba(157, 223, 243, 0.2) 100%
  );
  color: white;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Button = ({ text }: { text: string }) => {
  return <StyledButton>{text}</StyledButton>;
};

export default Button;
