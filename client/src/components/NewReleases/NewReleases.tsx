import { useRouteLoaderData } from 'react-router';
import Carousel from './Carousel';

function NewReleases() {
  const { newReleases } = useRouteLoaderData('home');

  return (
    <div className='h-[65vw] w-full lg:col-start-2 lg:col-end-5 lg:h-[unset] lg:px-4 lg:pt-8'>
      <Carousel newReleases={newReleases} />
    </div>
  );
}

export default NewReleases;
