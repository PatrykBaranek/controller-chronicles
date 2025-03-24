import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import VideoSliderItem from '../UI/VideoSliderItem';
import { styled } from 'styled-components';
import { YoutubeVideo } from '~/types/types';

type Props = {
  heading: 'Trailers' | 'Reviews';
  videosPromise: Promise<YoutubeVideo[]>;
};

const StyledVideoSlider = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  .splide {
    position: unset;
    &__arrows {
      position: absolute;
      width: 100%;
      top: 3%;
      right: 0;
      @media screen and (min-width: 900px) {
        width: unset;
      }
    }
    &__arrow {
      background: #ffffff26;
      border-radius: 7px;
      width: 1.5rem;
      height: 1.5rem;
      svg {
        fill: #fff;
        opacity: 0.9;
      }
    }
  }
  @media screen and (min-width: 900px) {
    padding-right: 0;
    text-align: left;
    .splide__arrow--prev {
      left: -5rem;
    }
  }
  @media screen and (min-width: 1050px) {
    grid-column: span 2 / span 2;
  }
`;
const StyledSplideSlide = styled(SplideSlide)`
  @media screen and (min-width: 900px) {
    padding-block: 1rem;
  }
`;

function DetailsSlider({ heading, videosPromise }: Props) {
  const videos = React.use(videosPromise) as YoutubeVideo[];

  return (
    <StyledVideoSlider>
      <h3 className='mb-4 ml-4 text-[1.2rem] font-bold'>{heading}</h3>
      <Splide
        options={{
          arrows: true,
          pagination: false,
          rewind: true,
          gap: '1rem',
          easing: 'ease',
          perPage: 1,
          drag: false,
          fixedWidth: '100%',
          mediaQuery: 'min',
          breakpoints: {
            900: {
              fixedWidth: '30%',
              padding: '1rem',
              perPage: 3,
            },
          },
          start: 0,
        }}
      >
        {videos?.slice(0, 34).map(({ link, thumbnail, title }, idx) => (
          <StyledSplideSlide key={idx}>
            <VideoSliderItem link={link} title={title} thumbnail={thumbnail} isInDetails={true} />
          </StyledSplideSlide>
        ))}
      </Splide>
    </StyledVideoSlider>
  );
}

export default DetailsSlider;
