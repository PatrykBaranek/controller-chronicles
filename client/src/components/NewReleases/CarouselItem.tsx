import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getGameById } from '#/api/gamesApi';
import iconFilter from '#/utils/iconFilter';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

type CarouseItemProps = {
  id: number;
  isActive: boolean;
  image: string;
};

function CarouselItem({ isActive, image, id }: CarouseItemProps) {
  const { data } = useQuery({
    queryKey: ['/games/:id', id],
    queryFn: () => getGameById(id),
  });

  const title = data?.rawgGame.name;
  const description = data?.rawgGame.description_raw;
  const stores = data?.rawgGame.stores;
  const releaseDate = dayjs(data?.rawgGame.released).format('DD.MM.YYYY');
  const isDateValid = releaseDate !== 'Invalid Date';

  return (
    <Link
      className={twMerge(
        'absolute flex h-full w-full items-center overflow-hidden transition-[all_0.5s_ease-in-out]',
        isActive ? 'opacity-100' : 'hidden'
      )}
      to={`/games/${id}`}
    >
      <img className='aspect-3/2 h-full w-full lg:cursor-pointer lg:rounded-2xl' src={image} />

      <span className='absolute left-0 h-full w-full bg-[linear-gradient(0deg,rgba(0,0,0,0.7)_30%,rgba(255,255,255,0)_100%)] lg:rounded-2xl' />

      <span
        className={twMerge(
          'absolute bottom-[52%] left-[5%] flex max-w-12 gap-4 transition-all duration-1000 ease-in-out',
          isActive
            ? 'translate-y-[52%] opacity-[1] lg:translate-y-[100%]'
            : 'translate-y-[300%] opacity-[0]'
        )}
      >
        {stores?.map((store) => (
          <img
            className='aspect-3/2 w-[90%] rounded-[0] object-contain xl:w-full'
            key={store.store.slug}
            src={iconFilter(store.store.slug)}
          />
        ))}
      </span>

      <span
        className={twMerge(
          'absolute bottom-[40%] left-[5%] w-[50%] text-[clamp(0.5rem,3vw,1.2rem)] font-bold text-[#ffffffcc] transition-all delay-[0.1s] duration-[1s] ease-in-out md:w-[50%]',
          isActive
            ? 'translate-y-[70%] opacity-[1] md:translate-y-[95%]'
            : 'translate-y-[300%] opacity-[0]'
        )}
      >
        {title}
      </span>
      <span
        className={twMerge(
          'absolute bottom-[30%] left-[5%] w-[50%] text-[clamp(0.4rem,2.5vw,1.2rem)] font-bold text-[#ffffffcc] transition-all delay-[0.1s] duration-1000 ease-in-out md:text-[clamp(0.5rem,1.75vw,1rem)]',
          isActive
            ? 'translate-y-[50%] opacity-[1] lg:translate-y-[45%]'
            : 'translate-y-[300%] opacity-[0]'
        )}
      >
        {`Date of release: ${isDateValid ? releaseDate : 'Unknown'}`}
      </span>
      <span
        className={twMerge(
          'absolute bottom-[20%] left-[5%] w-[80%] text-[clamp(0.5rem,2.8vw,1rem)] font-bold text-[#ffffffcc] transition-all delay-[0.2s] duration-1000 ease-in-out md:text-[clamp(0.5rem,1.5vw,1rem)]',
          isActive
            ? 'translate-y-[80%] opacity-[1] lg:translate-y-[60%]'
            : 'translate-y-[300%] opacity-[0]'
        )}
      >
        {description && description.length > 150
          ? `${description?.slice(0, 150)}...`
          : description === ''
            ? 'There is no description yet'
            : description}
      </span>
    </Link>
  );
}

export default CarouselItem;
