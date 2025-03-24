import useWindowWidth from '#/hooks/useWindowWidth';
import isDesktopWidth from '#/utils/isDesktopWidth';
import { twMerge } from 'tailwind-merge';

type CarouselPaginationProps = {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  image: string;
  name: string;
};

function CarouselPagination({ name, image, isActive, onClick }: CarouselPaginationProps) {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);

  if (!isDesktop) {
    return (
      <div
        className={twMerge(
          'ml-2.5 inline-block h-2.5 w-2.5 cursor-pointer rounded-full',
          isActive ? 'bg-[steelblue]' : 'bg-[#f5f5f5]'
        )}
        onClick={onClick}
      />
    );
  }

  return (
    <div
      className={twMerge(
        'flex h-25 w-full cursor-pointer rounded-xl bg-[linear-gradient(131.88deg,#a63ee72f_14.48%,#00eaff2b_83.43%)] p-2 md:px-4',
        isActive && 'bg-[linear-gradient(131.88deg,#A73EE7_14.48%,#00EBFF_83.43%)]'
      )}
      onClick={onClick}
    >
      <div className='flex w-[40%] items-center 2xl:w-[30%]'>
        <img src={image} alt={`${name} image`} className='max-h-[80%] w-[80%] rounded-xl' />
      </div>
      <div className='flex w-[60%] items-center justify-center text-center'>
        <p className='text-white active:text-[#ebebf5bf]'>{name}</p>
      </div>
    </div>
  );
}

export default CarouselPagination;
