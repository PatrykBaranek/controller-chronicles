import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useStore from '#/store/store';
import { Games } from '#/types/types';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
type StyledProps = {
  isActive: boolean;
};
const StyledCarousel = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  margin-bottom: 1rem;
`;
const StyledCarouselWrapper = styled.div<StyledProps>`
  position: relative;
  z-index: ${({ isActive }) => (isActive ? '-1' : 0)};
  width: 100%;
  @media screen and (min-width: 900px) {
    min-height: 25rem;
    width: 68%;
  }
  @media screen and (min-width: 1000px) {
    min-height: 30rem;
    width: 68%;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  position: absolute;
  bottom: -8%;
  left: 50%;
  transform: translate(-50%, 0);

  @media screen and (min-width: 900px) {
    justify-content: center;
    height: 100%;
    right: 0;
    width: 30%;
    left: unset;
    transform: unset;
    bottom: unset;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Carousel = ({ newReleases }: { newReleases: Games[] | undefined }) => {
  const { isMenuOpen } = useStore();
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut: ReturnType<typeof setTimeout>;
  useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 5000);
    }
  });

  const slideRight = () => {
    setCurrent(
      newReleases && current === newReleases.length - 1 ? 0 : current + 1
    );
  };

  return (
    <StyledCarousel
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <StyledCarouselWrapper isActive={isMenuOpen}>
        {newReleases?.map((item, index) => {
          return (
            <CarouselItem
              id={item.id}
              isActive={index === current}
              key={index}
              image={item.background_image}
            />
          );
        })}
      </StyledCarouselWrapper>
      <StyledPagination>
        {newReleases?.map((item, index) => {
          return (
            <CarouselPagination
              key={index}
              name={item.name}
              image={item.background_image}
              isActive={index === current}
              onClick={() => setCurrent(index)}
            />
          );
        })}
      </StyledPagination>
    </StyledCarousel>
  );
};

export default Carousel;
