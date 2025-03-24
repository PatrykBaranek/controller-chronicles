import React from 'react';
import { Await } from 'react-router';
import { YoutubeResponse } from '~/types/types';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import VideoSliderItem from './VideoSliderItem';

type VideoSliderProps = {
  heading: string;
  videos: Promise<YoutubeResponse>;
};

const VideoSlider = ({ videos, heading }: VideoSliderProps) => {
  return (
    <div className='relative mt-[10vw] mb-4 flex flex-col px-4 text-center md:mt-[5vw] md:pr-0 md:text-left'>
      <React.Suspense>
        <Await resolve={videos}>
          {(videos) => (
            <>
              <h3 className='mb-4 ml-4 text-[1.2rem] font-medium'>{heading}</h3>
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
                className='[&_.splide__arrow]:h-6 [&_.splide__arrow]:w-6 [&_.splide__arrow]:rounded-[7px] [&_.splide__arrow]:bg-[#ffffff26] [&_.splide__arrow_svg]:fill-white [&_.splide__arrow_svg]:opacity-90 [&_.splide__arrow--prev]:left-[-94vw] md:[&_.splide__arrow--prev]:left-[-5rem] [&_.splide__arrows]:absolute [&_.splide__arrows]:top-[3%] [&_.splide__arrows]:right-[1%]'
              >
                {videos?.slice(0, 34).map(({ link, thumbnail, title }, idx) => (
                  <SplideSlide key={idx} className='md:py-4'>
                    <VideoSliderItem link={link} title={title} thumbnail={thumbnail} />
                  </SplideSlide>
                ))}
              </Splide>
            </>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default VideoSlider;
