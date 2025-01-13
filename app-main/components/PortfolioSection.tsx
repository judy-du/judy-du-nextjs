// components/PortfolioSection.tsx

import React from 'react';

export default function PortfolioSection() {
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

        /* On md+ screens, shift content right by 25% for the left nav */
        md:ml-[25%]
      "
    >
      <p className="max-w-2xl text-lg md:text-xl leading-relaxed mb-8 font-now">
        “Simplicity is the ultimate sophistication.”
        <br />– Leonardo da Vinci
      </p>

      <a
        href="/judydu-portfolio.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block
          px-6 py-2
          bg-white
          text-pink-700
          font-semibold
          rounded
          shadow
          hover:opacity-80
        "
      >
        View Portfolio (PDF)
      </a>
    </div>
  );
}
