import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getGameById } from '../../api/gamesApi';
import iconFilter from '../../utils/iconFilter';
import dayjs from 'dayjs';
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
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 30%, rgba(255, 255, 255, 0) 100%);
  @media screen and (min-width: 900px) {
    border-radius: 1rem;
  }
`;
const StyledTitle = styled.span<StyledProps>`
  position: absolute;
  width: 50%;
  bottom: 40%;
  transform: translateY(${({ $isActive }) => ($isActive ? '70%' : '300%')});
  left: 5%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: all 1s ease-in-out 0.1s;
  color: #ffffffcc;
  font-size: clamp(0.5rem, 3vw, 1.2rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  @media screen and (min-width: 900px) {
    width: 50%;
    font-size: clamp(0.5rem, 2vw, 1.2rem);
  }
  @media screen and (min-width: 1000px) {
    transform: translateY(${({ $isActive }) => ($isActive ? '95%' : '300%')});
  }
`;
const StyledReleaseDate = styled.span<StyledProps>`
  position: absolute;
  width: 50%;
  bottom: 30%;
  transform: translateY(${({ $isActive }) => ($isActive ? '50%' : '300%')});
  left: 5%;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: all 1s ease-in-out 0.1s;
  color: #ffffffcc;
  font-size: clamp(0.4rem, 2.5vw, 1.2rem);
  font-weight: ${({ theme }) => theme.fontWeights.semiBild};
  @media screen and (min-width: 900px) {
    width: 50%;
    font-size: clamp(0.5rem, 1.75vw, 1rem);
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
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transform: translateY(${({ $isActive }) => ($isActive ? '52%' : '300%')});
  transition: all 1s ease-in-out;
  max-width: 3rem;
  position: absolute;
  bottom: 52%;
  left: 5%;
  @media screen and (min-width: 1000px) {
    transform: translateY(${({ $isActive }) => ($isActive ? '100%' : '300%')});
  }
  img {
    width: 90%;
    aspect-ratio: 3/2;
    object-fit: contain;
    border-radius: 0;
    @media screen and (min-width: 1800px) {
      width: 100%;
    }
  }
`;
const CarouselItem = ({ isActive, image, id }: CarouseItemProps) => {
  const { data } = useQuery(['/games/:id', id], () => getGameById(id));
  const title = data?.rawgGame.name;
  const description = data?.rawgGame.description_raw;
  const stores = data?.rawgGame.stores;
  const releaseDate = dayjs(data?.rawgGame.released).format('DD.MM.YYYY');
  const isDateValid = releaseDate !== 'Invalid Date';

  return (
    <StyledCarouselItem $isActive={isActive} to={`/games/${id}`}>
      <img src={image} />
      <StyledOverlay></StyledOverlay>
      <StyledIcon $isActive={isActive}>
        {stores?.map((store) => (
          <img key={store.store.slug} src={iconFilter(store.store.slug)} />
        ))}
      </StyledIcon>
      <StyledTitle $isActive={isActive}>{title}</StyledTitle>
      <StyledReleaseDate $isActive={isActive}>
        {`Date of release: ${isDateValid ? releaseDate : 'Unknown'}`}
      </StyledReleaseDate>
      <StyledDescription $isActive={isActive}>
        {description && description.length > 150
          ? `${description?.slice(0, 150)}...`
          : description === ''
          ? 'There is no description yet'
          : description}
      </StyledDescription>
    </StyledCarouselItem>
  );
};

export default CarouselItem;
