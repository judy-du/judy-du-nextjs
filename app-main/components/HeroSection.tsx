// components/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  const handleExploreClick = () => {
    const cvSection = document.getElementById('cv');
    cvSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      // "h-screen" => exactly 100vh, no more
      className="
        w-full
        h-screen
        flex
        flex-col
        items-center
        justify-center
        text-center
      "
    >
      <img
        src="/img/judy-du-navigation-logo.png"
        alt="Judy Du"
        className="h-16 w-auto mb-6"
      />

      <p className="text-2xl md:text-3xl font-semibold mb-8 leading-relaxed">
        VISUALS THAT CAPTIVATE <br />
        STRATEGIES THAT RESONATE
      </p>

      <button
        onClick={handleExploreClick}
        className="
          relative
          text-white text-xl font-bold
          uppercase tracking-wider
          bg-transparent
          border-none
          cursor-pointer
          outline-none
        "
      >
        <span className="relative z-10">Explore</span>
        <span className="absolute inset-0 flex items-center justify-center -z-0">
          <span
            className="
              block
              w-12 h-3
              bg-red-500
              blur-md
              rounded-full
            "
          />
        </span>
      </button>
    </section>
  );
};

export default HeroSection;
