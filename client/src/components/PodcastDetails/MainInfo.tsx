import { addPodcastToCollection } from '#/api/gamesApi';
import errorIco from '#/assets/errorIco.svg';
import heartIcon from '#/assets/heartIcon.svg';
import successIco from '#/assets/successIco.svg';
import type { Podcast } from '#/types/types';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'sonner';
import ConfirmationModal from '../UI/ConfirmationModal';

function MainInfo({ podcast }: { podcast?: Podcast }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPodcastInCollection, setIsPodcastInCollection] = useState(false);

  const addToCollection = useMutation({
    mutationFn: () => addPodcastToCollection(podcast?.id!),
    onSuccess: () => {
      toast('Success', {
        className: 'default',
        description: `${podcast?.name} successfully added to collection`,
        duration: 5000,
        icon: <img src={successIco} />,
        position: 'top-right',
      });
    },
    onError: (error: any) => {
      toast('Error', {
        className: 'default',
        description: error?.response?.data?.message,
        duration: 5000,
        icon: <img src={errorIco} />,
        position: 'top-right',
      });
    },
  });

  return (
    <>
      <div className='mt-4 mb-8 flex w-full flex-col gap-4 text-left md:mb-0 md:ml-0 md:gap-6'>
        <h1 className='text-[clamp(1.5rem,5vw,2.8rem)]'>{podcast?.name}</h1>
        <div className='flex gap-4'>
          <span className='w-fit rounded-[10px] border border-white px-[0.3rem] py-1 text-sm font-medium text-white capitalize md:rounded-[15px] md:px-2 md:py-2'>
            {podcast?.media_type}
          </span>
          <span className='w-fit rounded-[10px] border border-white px-[0.3rem] py-1 text-sm font-medium text-white capitalize md:rounded-[15px] md:px-2 md:py-2'>
            {podcast?.type}
          </span>
        </div>
        <p className='text-[clamp(0.9rem,2vw,1.2rem)] text-[#ebebf5bf]'>{podcast?.publisher}</p>

        <div className='flex items-center gap-4'>
          <p className='text-[#ebebf5bf]'>Languages</p>
          {podcast?.languages.slice(0, 4).map((language) => (
            <span
              key={language}
              className='w-fit rounded-[10px] border border-[#ffffff99] px-[0.3rem] py-1 text-sm font-medium text-[#ebebf5bf] capitalize md:rounded-[15px] md:px-2 md:py-2'
            >
              {language}
            </span>
          ))}
        </div>

        <div className='w-full break-words'>
          <h2 className='mb-2 text-[clamp(1.5rem,5vw,2.8rem)]'>Description</h2>
          <p className='leading-tight font-light text-[#ebebf5bf]'>{podcast?.description}</p>
        </div>

        <div className='flex w-full justify-between md:justify-start md:gap-20'>
          <Link
            className='rounded-full bg-gradient-to-r from-[rgba(15,85,232,0.1)] to-[rgba(157,223,243,0.1)] px-8 py-4 text-[clamp(0.8rem,3vw,1rem)] text-[#ebebf5bf] transition-all duration-200 hover:contrast-[5]'
            target='_blank'
            to={podcast?.external_urls?.spotify || ''}
          >
            Check on Spotify
          </Link>
          <Tooltip
            title={isPodcastInCollection ? 'Podcast already in collection' : 'Add to collection'}
            arrow
          >
            <span>
              <button
                disabled={isPodcastInCollection}
                className='relative cursor-pointer rounded-full border-none bg-gradient-to-r from-[rgba(15,85,232,0.1)] to-[rgba(157,223,243,0.1)] p-6 transition-all duration-200 hover:contrast-[5] disabled:pointer-events-none disabled:bg-[#ffffff99]'
                onClick={() => setIsDialogOpen(true)}
              >
                <img
                  src={heartIcon}
                  alt='add to collection'
                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'
                />
              </button>
            </span>
          </Tooltip>
        </div>
      </div>
      {isDialogOpen && (
        <ConfirmationModal
          heading={`Add ${podcast?.name} to collection?`}
          isOpen={isDialogOpen}
          handleClose={() => setIsDialogOpen((prev) => !prev)}
          confirmCallback={() => addToCollection.mutate()}
          buttonText='Add'
          contentText=''
        />
      )}
    </>
  );
}

export default MainInfo;
