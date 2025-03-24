import Skeleton from '@mui/material/Skeleton';

export default function BestsellersSkeleton() {
  return (
    <Skeleton
      sx={{
        backgroundImage: 'linear-gradient(131.88deg, #a63ee73b 14.48%, #00eaff2d 83.43%)',
        borderRadius: '1rem ',
      }}
      animation='wave'
      variant='rounded'
      height={'200px'}
      width={'100%'}
    />
  );
}
