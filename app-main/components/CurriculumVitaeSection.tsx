// components/CurriculumVitaeSection.tsx
import React from 'react';
import ReactPlayer from 'react-player';

const CurriculumVitaeSection: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">Video CV</h1>

      <div className="mb-6">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=4pliVlTGqUo"
          controls
          width="560px"
          height="315px"
          light={false}
          playing={false}
          playbackRate={1.0}
        />
      </div>

      <div>
        <a
          href="/judydu-cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-6 py-2
            bg-white text-pink-700 font-semibold
            rounded shadow
            hover:opacity-80
          "
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default CurriculumVitaeSection;
