import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGameById } from '#/api/gamesApi';
import iconFilter from '#/utils/iconFilter';
import { Skeleton } from '@mui/material';
type CarouseItemProps = {
  id: number;
  isActive: boolean;
  image: string;
};
type StyledProps = {
  $isActive: boolean;
};
const StyledCarouselItem = styled(Link)<StyledProps>`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  pointer-events: ${({ $isActive }) => ($isActive ? 'visible' : 'none')};
  transition: all 0.5s ease-in-out;
  img {
    width: 100%;
    height: 100%;
    @media screen and (min-width: 900px) {
      border-radius: 1rem;
      cursor: pointer;
    }
  }
`;

const StyledOverlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(255, 255, 255, 0) 100%
  );
  @media screen and (min-width: 900px) {
    border-radius: 1rem;
  }
`;
const StyledTitle = styled.span<StyledProps>`
  position: absolute;
  width: 35%;
  bottom: 35%;
  transform: translateY(${({ $isActive }) => ($isActive ? '65%' : '300%')});
  left: 5%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: all 1s ease-in-out 0.1s;
  color: #ffffffcc;
  font-size: clamp(0.5rem, 3vw, 1.2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  @media screen and (min-width: 900px) {
    width: 40%;
    font-size: clamp(0.5rem, 2vw, 1.2rem);
  }
  @media screen and (min-width: 1000px) {
    transform: translateY(${({ $isActive }) => ($isActive ? '45%' : '300%')});
  }
`;

const StyledDescription = styled.span<StyledProps>`
  position: absolute;
  width: 80%;
  bottom: 20%;
  transform: translateY(${({ $isActive }) => ($isActive ? '80%' : '300%')});
  left: 5%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: all 1s ease-in-out 0.2s;
  color: #ffffffcc;
  font-size: clamp(0.5rem, 2.8vw, 1rem);
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  @media screen and (min-width: 900px) {
    font-size: clamp(0.5rem, 1.5vw, 1rem);
  }
  @media screen and (min-width: 1000px) {
    transform: translateY(${({ $isActive }) => ($isActive ? '60%' : '300%')});
  }
`;
const StyledIcon = styled.span<StyledProps>`
  display: flex;
  gap: 1rem;
  opacity: ${({ $isActive }) => ($isActive ? 0.8 : 0)};
  transform: translateY(${({ $isActive }) => ($isActive ? '52%' : '300%')});
  transition: all 1s ease-in-out;
  width: clamp(1rem, 4vw, 1.8rem);
  position: absolute;
  bottom: 48%;
  left: 5%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;
const CarouselItem = ({ isActive, image, id }: CarouseItemProps) => {
  const { data } = useQuery(['/games/:id', id], () => getGameById(id));
  const title = data?.rawgGame.name;
  const description = data?.rawgGame.description_raw;
  const stores = data?.rawgGame.stores;
  return (
    <StyledCarouselItem
      $isActive={isActive}
      to={`/games/${id}`}
    >
      <img src={image} />
      <StyledOverlay></StyledOverlay>

      <StyledTitle $isActive={isActive}>{title}</StyledTitle>

      <StyledIcon $isActive={isActive}>
        {stores?.map(store => (
          <img
            key={store.id}
            src={iconFilter(store.store.slug)}
          />
        ))}
      </StyledIcon>

      <StyledDescription $isActive={isActive}>
        {description && description.length > 150
          ? `${description?.slice(0, 150)}...`
          : description}
      </StyledDescription>
    </StyledCarouselItem>
  );
};

export default CarouselItem;
