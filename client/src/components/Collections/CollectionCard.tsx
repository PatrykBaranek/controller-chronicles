import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

const CollectionCard = ({ img, length, id }: { img: string; length?: number; id: string }) => {
  // Calculate width based on length for larger screens
  const dynamicWidth = length ? `${18 - 1.5 * length}vw` : 'auto';

  return (
    <div
      className={twMerge(
        "overflow-hidden rounded-[0.7rem]",
        "xl:relative xl:left-0 xl:flex xl:cursor-pointer xl:overflow-hidden xl:p-[1px]",
        "xl:transition-all xl:duration-[0.4s] xl:ease-out xl:not-first:ml-[-50px]",
        "xl:before:pointer-events-none xl:before:absolute xl:before:inset-0 xl:before:rounded-2xl",
        "xl:before:bg-gradient-to-l xl:before:from-[#00ebff7a]",
        "xl:before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        "xl:before:mask-composite-xor xl:before:mask-composite-exclude",
        "xl:before:p-[1.5px] xl:before:content-['']",
        "hover:xl:transform hover:xl:transition-all hover:xl:duration-[0.4s] hover:xl:ease-out",
        "hover:xl:~:relative hover:xl:~:left-[30px] hover:xl:~:transition-all hover:xl:~:duration-[0.4s] hover:xl:~:ease-out",
        length && length > 1 ? "hover:xl:translate-y-[-8px]" : ""
      )}
    >
      <Link to={`/games/${id}`}>
      <img
        src={img}
        alt=''
        className='aspect-[3/2] w-full xl:rounded-2xl'
        style={{ width: window.innerWidth >= 1200 ? dynamicWidth : '100%' }}
      />
      </Link>
    </div>
  );
};

export default CollectionCard;
