import Skeleton from '@mui/material/Skeleton';
import useWindowWidth from '~/hooks/useWindowWidth';
import isDesktopWidth from '~/utils/isDesktopWidth';

export default function VideoSliderSkeleton() {
  const windowWidth = useWindowWidth();
  const isDesktop = isDesktopWidth(windowWidth);

  return (
    <Skeleton
      sx={{
        backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
        borderRadius: '1rem ',
      }}
      animation='wave'
      variant='rounded'
      height={isDesktop ? '20vw' : '55vw'}
      width={'100%'}
    />
  );
}
