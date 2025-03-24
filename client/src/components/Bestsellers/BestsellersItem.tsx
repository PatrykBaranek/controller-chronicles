import { type Bestseller } from '#/types/types';
import Card from '../UI/Card';
import { Link } from 'react-router';
import getGameIdFromUrl from '#/utils/getGameIdFromUrl';

type BestsellersItemProps = Bestseller & {
  idx: number;
};

const BestsellersItem = ({ img, link, name, idx }: BestsellersItemProps) => {
  const gameId = getGameIdFromUrl(link);
  return (
    <Card>
      <Link to={link} target='_blank' className='overflow-hidden rounded-[0.7rem]'>
        <img
          className='h-full w-full'
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `${img}`;
          }}
          alt={`${name} image`}
        />
        <span className='rounded-4 absolute left-1/2 h-full w-full -translate-x-1/2 bg-gradient-to-t from-black/40 via-transparent to-transparent text-white'>
          <span className='absolute bottom-[15%] left-1/2 flex w-4/5 -translate-x-1/2 justify-center text-center text-[clamp(0.7rem,2vw,0.9rem)] font-medium'>
            <p>{name}</p>
          </span>
          <p className='absolute right-[5%] bottom-[7%] text-[clamp(0.7rem,2vw,0.9rem)] font-bold text-white'>
            {idx + 1}
          </p>
        </span>
      </Link>
    </Card>
  );
};

export default BestsellersItem;
