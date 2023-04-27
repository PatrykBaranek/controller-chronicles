import { Gamecard } from '#/types/types';
import styled from 'styled-components';
import Card from '../UI/Card';
const StyledImage = styled.div`
  width: 100%;
  height: 50%;
  img {
    border-radius: 1rem 1rem 0 0;
    width: 100%;
    height: 100%;
  }
`;
const StyledContent = styled.div`
  width: 100%;
  height: 50%;
  padding-inline: 1rem;
  padding-top: 1.5rem;
`;
const StyledTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: 1rem;
  }
  p {
    color: ${({ theme }) => theme.colors.primary};
    span {
      color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;
const StyledDescription = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-block: 1rem;
  line-height: 1.1;
  p {
    font-size: 0.8rem;
  }
`;

const GameCard = ({ image, title, description, rating }: Gamecard) => {
  return (
    <Card>
      <StyledImage>
        <img
          src={image}
          alt=''
        />
      </StyledImage>
      <StyledContent>
        <StyledTopSection>
          <h1>Title</h1>
          <p>
            Rating <span>4.5/5</span>
          </p>
        </StyledTopSection>
        <StyledDescription>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod non
            dolorem fugiat fuga quisquam. Nam vel perspiciatis quos quam libero
            fugit necessitatibus, odio saepe veritatis eos cupiditate
            repellendus itaque tempora!
          </p>
        </StyledDescription>
      </StyledContent>
    </Card>
  );
};

export default GameCard;
