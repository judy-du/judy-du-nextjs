// components/CurriculumVitaeSection.tsx
import React from 'react';

const CurriculumVitaeSection: React.FC = () => {
  return (
    // We rely on parent <section> for h-screen, so here = h-full
    <div
      className="
        w-full
        h-full
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <h1 className="text-3xl font-bold mb-4">Video CV</h1>

      <div className="mb-6">
        <video controls className="max-w-full md:max-w-2xl shadow-lg">
          <source src="/video/curriculum-vitae.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
