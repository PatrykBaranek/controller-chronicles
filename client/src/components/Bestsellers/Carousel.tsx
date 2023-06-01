import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import useStore from '#/store/store';
import { Bestseller } from '#/types/types';
import CarouselItem from './CarouselItem';
import CarouselPagination from './CarouselPagination';
type StyledProps = {
  isActive: boolean;
};
const StyledCarousel = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
`;
const StyledCarouselWrapper = styled.div<StyledProps>`
  position: relative;
  z-index: ${({ isActive }) => (isActive ? '-1' : 0)};
  width: 100%;
  height: 100%;
  @media screen and (min-width: 900px) {
    min-height: 25rem;
    width: 68%;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);

  @media screen and (min-width: 900px) {
    right: 0;
    width: 30%;
    left: unset;
    transform: unset;
    bottom: unset;
    flex-direction: column;
    gap: 1.5rem;
  }
  @media screen and (min-width: 1500px) {
    gap: 1.2rem;
  }
`;

const Carousel = ({
  bestsellers,
}: {
  bestsellers: Bestseller[] | undefined;
}) => {
  const { isMenuOpen } = useStore();
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut: ReturnType<typeof setTimeout>;
  useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 3500);
    }
  });

  const slideRight = () => {
    setCurrent(
      bestsellers && current === bestsellers.length - 1 ? 0 : current + 1
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
        {bestsellers?.map((item, index) => {
          return (
            <CarouselItem
              isActive={index === current}
              key={index}
              link={item.link}
              image={item.img}
            />
          );
        })}
      </StyledCarouselWrapper>
      <StyledPagination>
        {bestsellers?.map((item, index) => {
          return (
            <CarouselPagination
              key={index}
              name={item.name}
              image={item.img}
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
