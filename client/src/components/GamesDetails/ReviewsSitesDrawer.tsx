import type { ReviewsSites } from '#/types/types';
import React from 'react';
import { Await, Link, useRouteLoaderData } from 'react-router';
import { twMerge } from 'tailwind-merge';

type ReviewsSitesDrawerProps = {
  isOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ReviewsSitesDrawer({ isOpen, setIsDrawerOpen }: ReviewsSitesDrawerProps) {
  const { reviewSites } = useRouteLoaderData('gameDetails') as {
    reviewSites: Promise<ReviewsSites>;
  };

  return (
    <form
      className={twMerge(
        'fixed top-0 left-0 z-10 flex h-screen w-full flex-col gap-10 bg-gradient-to-br from-[rgba(60,112,85,0.5)] via-[rgba(34,23,56,0.8)] to-[rgba(34,20,117,0.4)] p-8 backdrop-blur-[10px] transition-all delay-200 duration-600 ease-in-out md:w-1/2 md:shadow-lg xl:w-[30vw]',
        isOpen
          ? 'translate-x-0 opacity-100 md:translate-x-full xl:translate-x-[235%]'
          : 'translate-x-[200%] opacity-0 md:translate-x-[300%] xl:translate-x-[400%]'
      )}
    >
      <button
        className='font-inherit w-fit cursor-pointer rounded-md border-none bg-[#00eaffae] px-2 py-[0.3rem] text-[0.9rem] font-medium text-white shadow'
        onClick={(e) => {
          e.preventDefault();
          setIsDrawerOpen(false);
        }}
      >
        Back
      </button>

      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={reviewSites}>
          {(reviewSites) =>
            reviewSites?.map((site) => (
              <div
                key={site.url}
                className="relative pb-2 text-[0.9rem] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#ebebf5bf] after:content-['']"
              >
                <Link
                  to={site.url}
                  target='_blank'
                  className='block p-2 text-[#ebebf5bf] transition-all duration-200 ease-in-out hover:text-[#F4BF4F]'
                >
                  {site.title}
                </Link>
              </div>
            ))
          }
        </Await>
      </React.Suspense>
    </form>
  );
}

export default ReviewsSitesDrawer;
