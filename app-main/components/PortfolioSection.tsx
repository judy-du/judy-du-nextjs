// components/PortfolioSection.tsx
import React from 'react';

export default function PortfolioSection() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">My Portfolio</h2>
      
      <p className="max-w-2xl text-lg md:text-xl leading-relaxed mb-8">
        “Simplicity is the ultimate sophistication.” – Leonardo da Vinci
      </p>

      <a
        href="/judydu-portfolio.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold uppercase rounded-full"
      >
        View Portfolio (PDF)
      </a>
    </div>
  );
}
