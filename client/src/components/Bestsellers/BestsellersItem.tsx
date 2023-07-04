import { type Bestseller } from '#/types/types';
import styled from 'styled-components';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';
import getGameIdFromUrl from '#/utils/getGameIdFromUrl';

const StyledBestsellersItem = styled(Link)`
  border-radius: 0.7rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledOverlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(255, 255, 255, 0) 50%
  );
  border-radius: 1rem;
  @media screen and (min-width: 900px) {
  }
  span {
    display: flex;
    width: 80%;
    justify-content: space-between;
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: clamp(0.7rem, 2vw, 1rem);
  }
`;

const BestsellersItem = ({
  img,
  link,
  name,
  price,
  idx,
}: Bestseller & { idx: number }) => {
  const gameId = getGameIdFromUrl(link);
  return (
    <Card>
      <StyledBestsellersItem to={link}>
        <img
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${img}`;
          }}
          alt={`${name} image`}
        />
        <StyledOverlay>
          <span>
            <p>{name}</p>
            <p>{idx + 1} / 10</p>
            <p>{price || '0zł'}</p>
          </span>
        </StyledOverlay>
      </StyledBestsellersItem>
    </Card>
  );
};

export default BestsellersItem;
