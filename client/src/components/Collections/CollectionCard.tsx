import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  length?: number;
};

const StyledCollectionCard = styled.div<Props>`
  border-radius: 0.7rem;
  overflow: hidden;
  img {
    width: 100%;
    aspect-ratio: 3/2;
  }
  @media screen and (min-width: 1200px) {
    display: flex;
    transition: 0.4s ease-out;
    position: relative;
    left: 0px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding: 1px;
    transition: all 0.2s ease-in-out;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      padding: 1.5px;
      background: linear-gradient(270deg, #00ebff7a 100%, rgba(255, 255, 255, 0) 70%);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
    &:not(:first-child) {
      margin-left: -50px;
    }
    &:hover {
      transform: ${({ length }) => (length && length > 1 ? 'translateY(-8px)' : '')};
      transition: 0.4s ease-out;
    }
    &:hover ~ & {
      position: relative;
      left: 30px;
      transition: 0.4s ease-out;
    }
    img {
      border-radius: 1rem;
      width: ${({ length }) => length && `${18 - 1.5 * length}vw`};
    }
  }
`;

const CollectionCard = ({ img, length, id }: { img: string; length?: number; id: string }) => {
  return (
    <StyledCollectionCard length={length}>
      <Link to={`/games/${id}`}>
        <img src={img} alt='' />
      </Link>
    </StyledCollectionCard>
  );
};

export default CollectionCard;
