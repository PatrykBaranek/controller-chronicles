import Bestsellers from '#/components/Bestsellers/Bestsellers';
import VideoSlider from '#/components/UI/VideoSlider';
import { getBestsellers, getNewestYoutubeVideos, getNewReleasedGames } from '~/api/gamesApi';
import type { Route } from './+types/Home';

export async function clientLoader() {
  const bestsellers = getBestsellers();
  const newReleases = getNewReleasedGames();
  const newesTrailers = getNewestYoutubeVideos('trailer');
  const newestReviews = getNewestYoutubeVideos('review');

  return { bestsellers, newesTrailers, newestReviews, newReleases };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { bestsellers, newesTrailers, newestReviews } = loaderData;

  return (
    <div className="w-full min-h-screen md:col-start-1 md:col-end-5">
      <Bestsellers bestsellers={bestsellers} />
      <VideoSlider videos={newestReviews} heading="Latests Reviews" />
      <VideoSlider videos={newesTrailers} heading="Upcoming Game Trailers" />
    </div>
  );
}
