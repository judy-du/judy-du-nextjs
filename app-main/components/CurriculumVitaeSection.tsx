// components/CurriculumVitaeSection.tsx

import React from 'react';
import ReactPlayer from 'react-player';
import useWindowSize from '../hooks/useWindowSize';

const CurriculumVitaeSection: React.FC = () => {
  const { width } = useWindowSize();

  return (
    <div
      className="
        relative
        w-full
        h-full
        overflow-x-hidden
        px-6 py-6
        text-center
        flex flex-col items-center justify-center

        /* On md+ screens, shift content right by 25% to avoid overlapping nav */
        md:ml-[25%]
      "
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Video CV</h1>

      <div className="mb-6">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=4pliVlTGqUo"
          controls
          width={width < 600 ? '90vw' : '40vw'}
          height={width < 600 ? '50.625vw' : '22.5vw'} // 16:9 aspect ratio
          light={false}
          playing={false}
          playbackRate={1.0}
        />
      </div>

      <div className="flex flex-col items-center space-y-4">
        <a
          href="/judydu-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-6 py-2
            bg-white
            text-pink-700
            font-semibold
            rounded shadow
            hover:opacity-80
          "
        >
          Download CV (PDF)
        </a>
      </div>
    </div>
  );
};

export default CurriculumVitaeSection;
