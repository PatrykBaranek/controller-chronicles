import type { Route } from './+types/PodcastDetails';
import { getPodcastById } from '#/api/gamesApi';
import MainInfo from '#/components/PodcastDetails/MainInfo';
import PodcastEpisodes from '#/components/PodcastDetails/PodcastEpisodes';

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const podcast = await getPodcastById(params.id);

  return { podcast };
}

export default function PodcastDetails({ loaderData }: Route.ComponentProps) {
  const { podcast } = loaderData;

  const episodes = podcast?.episodes?.items?.slice(0, 8) ?? [];

  return (
    <div className='min-h-screen w-full md:pt-8'>
      <div className='flex w-full flex-col md:flex-col md:px-4 lg:flex-row lg:gap-8'>
        <img
          src={podcast?.images[0].url}
          alt={podcast?.name}
          className='w-full md:max-w-screen md:rounded-2xl lg:aspect-[3/2] lg:w-1/2'
        />
        <div className='w-full px-6 md:flex md:flex-col md:gap-12 md:px-0 lg:justify-center lg:gap-0'>
          <MainInfo podcast={podcast} />
        </div>
      </div>
      <PodcastEpisodes heading='Episodes' data={episodes} url={podcast?.external_urls.spotify} />
    </div>
  );
}
