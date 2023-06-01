import getGameIdFromUrl from '#/utils/getGameIdFromUrl';
import styled from 'styled-components';
type CarouseItemProps = {
  isActive: boolean;
  image: string;
  link: string;
};
type StyledProps = {
  isActive: boolean;
};
const StyledCarouselItem = styled.a<StyledProps>`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  pointer-events: ${({ isActive }) => (isActive ? 'visible' : 'none')};
  transition: all 0.5s ease-in-out;
  @media screen and (min-width: 900px) {
  }
  img {
    width: 100%;
    height: 100%;
    @media screen and (min-width: 900px) {
      border-radius: 1rem;
    }
  }
`;
const CarouselItem = ({ isActive, image, link }: CarouseItemProps) => {
  const imageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${getGameIdFromUrl(
    image
  )}/capsule_616x353.jpg`;
  return (
    <StyledCarouselItem
      href={link}
      target='_blank'
      isActive={isActive}
    >
      <img
        onError={({ currentTarget }) => (currentTarget.src = link)}
        src={imageUrl ? imageUrl : image}
      />
    </StyledCarouselItem>
  );
};

export default CarouselItem;
