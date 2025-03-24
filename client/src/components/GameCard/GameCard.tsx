import React from 'react';
import type { Gamecard } from '#/types/types';
import heartIcon from '#/assets/heartIcon.svg';
import { Link } from 'react-router';
import AddToCollectionForm from '../Collections/AddToCollectionForm';
import Card from '../UI/Card';

function GameCard({
  id,
  image,
  title,
  rating,
  description,
  isPodcastCard,
  totalEpisodes,
}: Gamecard) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const isAuth = false; // TODO: fix this

  return (
    <>
      <Card>
        <Link style={{ paddingBottom: '2rem' }} to={`${id}`}>
          <div className='h-full w-full'>
            <img
              className='aspect-[3/2] w-full rounded-t-2xl'
              src={image}
              alt={`${title} image`}
              loading='lazy'
            />
          </div>

          <div className='grid h-full w-full ps-[1rem] pe-[1rem] pt-[0.5rem]'>
            <div className='flex items-center justify-between'>
              <h1 className='w-full text-[clamp(0.8rem,2vw,1rem)] font-bold md:text-[clamp(0.7rem,1vw,1rem)]'>
                {title}
              </h1>
              {isPodcastCard ? (
                <p className='text-right text-[clamp(0.8rem,2vw,1rem)] md:text-[clamp(0.8rem,2vw,1rem)]'>
                  Episodes{' '}
                  <span className='mt-[5px] inline-block text-yellow-300'>
                    {totalEpisodes || 0}
                  </span>
                </p>
              ) : (
                <p className='text-right text-[clamp(0.8rem,2vw,1rem)] md:text-[clamp(0.8rem,2vw,1rem)]'>
                  Rating{' '}
                  <span className='mt-[5px] inline-block text-yellow-300'>{rating ?? 0}/10</span>
                </p>
              )}
            </div>
            <div className='leading-[1.1] text-[#ebebf5bf]'>
              {description ? (
                <p className='text-[0.8rem]'>{description && description.slice(0, 250) + ' ...'}</p>
              ) : (
                <p className='text-[0.8rem]'>Something went wrong!</p>
              )}
            </div>
            {isAuth && !isPodcastCard && (
              <button
                className='mt-[0.5rem] grid aspect-[1] w-[40px] cursor-pointer justify-center rounded-full border-none bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.2)]'
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsDialogOpen(true);
                }}
              >
                <img src={heartIcon} alt='add to collection' />
              </button>
            )}
          </div>
        </Link>
      </Card>
      {isDialogOpen && (
        <AddToCollectionForm
          gameId={Number(id)}
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen((prev) => !prev)}
        />
      )}
    </>
  );
}

export default GameCard;
