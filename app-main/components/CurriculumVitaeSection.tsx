// components/CurriculumVitaeSection.tsx
import React from 'react';

const CurriculumVitaeSection: React.FC = () => {
  return (
    <section
      id="cv"
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        w-full        /* fill the available width */
        h-full        /* fill the parent's height if needed */
        overflow-auto /* if you want scrolling in this section alone */
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
    </section>
  );
};

export default CurriculumVitaeSection;
