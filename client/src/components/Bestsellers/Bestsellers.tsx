import BestsellersItem from './BestsellersItem';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { BestsellerResponse } from '~/types/types';
import React from 'react';
import { Await } from 'react-router';
import BestsellersSkeleton from './BestsellersSkeleton';
import '@splidejs/react-splide/css';

type BestsellersProps = {
  bestsellers: Promise<BestsellerResponse>;
};

export default function Bestsellers({ bestsellers }: BestsellersProps) {
  return (
    <div className='mt-[10vw] mb-[1rem] flex flex-col text-center md:mt-[5vw] md:p-0 md:text-start'>
      <React.Suspense fallback={<BestsellersSkeleton />}>
        <Await resolve={bestsellers}>
          {(bestsellers) => (
            <>
              <h3 className='mb-[1rem] ml-[1rem] text-[1.2rem] font-bold'>Steam Bestsellers</h3>
              <Splide
                options={{
                  arrows: false,
                  pagination: false,
                  autoplay: true,
                  interval: 4000,
                  rewind: true,
                  gap: '1rem',
                  easing: 'ease',
                  perPage: 1,
                  fixedWidth: '100%',
                  mediaQuery: 'min',
                  breakpoints: {
                    900: {
                      fixedWidth: '30%',
                      padding: '1rem',
                    },
                    1500: {
                      fixedWidth: '30%',
                      perPage: 3,
                    },
                  },
                  start: 0,
                }}
              >
                {bestsellers.games.map((bestseller, idx) => (
                  <SplideSlide key={bestseller.link} className='p-2'>
                    <BestsellersItem
                      img={bestseller.img}
                      price={bestseller.price}
                      name={bestseller.name}
                      link={bestseller.link}
                      idx={idx}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
}
