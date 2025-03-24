import React from 'react';
import ReactPlayer from 'react-player'; // Specific import for YouTube

type VideoSliderItemProps = {
  link: string;
  thumbnail: string;
  title: string;
  isInDetails?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
};

function VideoSliderItem({
  link,
  thumbnail,
  title,
  isInDetails = false,
  playing = false,
  loop = false,
  muted = false,
  volume = 0.8,
  onPlay,
  onPause,
  onEnded,
}: VideoSliderItemProps) {
  return (
    <div className="video-slider-item-wrapper mb-5">
      {/* Optional: Display title using Tailwind classes */}
      {/* <h4 className="text-lg font-semibold mb-2">{title}</h4> */}

      {/* 
        Player Wrapper: 
        - `relative` for positioning the player absolutely within it.
        - `w-full` to take the full width of its parent.
        - `aspect-video` (Tailwind v3+) or use aspect ratio plugin for older versions
          (e.g., with @tailwindcss/aspect-ratio: `aspect-w-16 aspect-h-9`).
          `aspect-video` is equivalent to 16/9.
      */}
      <div className="player-wrapper relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
        <ReactPlayer
          className="react-player absolute top-0 left-0"
          url={link}
          light={thumbnail}
          playing={playing}
          controls={true}
          loop={loop}
          muted={muted}
          volume={volume}
          width="100%" // Important for ReactPlayer to fill its container
          height="100%" // Important for ReactPlayer to fill its container
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
                // autoplay: 1, // Be cautious with autoplay
              },
            },
          }}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        />
      </div>

      {isInDetails && (
        <p className="mt-2 text-sm text-gray-600">
          Viewing details for: {title}
        </p>
      )}
    </div>
  );
}

export default VideoSliderItem;