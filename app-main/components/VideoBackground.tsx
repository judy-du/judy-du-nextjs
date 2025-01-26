// components/VideoBackground.tsx

import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  section?: string; 
  // e.g. 'hero', 'academic-projects', 'portfolio', etc.
}

// Simple map: section -> image URL (no cropping)
const imageMap: Record<string, string> = {
  hero: '/img/judy-du-snow.jpg',
  'academic-projects': '/img/judy-du-education.jpg',
  // Add more sections if you have them:
  // portfolio: '/img/judy-du-portfolio-cropped.jpg',
  // contact: '/img/judy-du-contact-cropped.jpg',
};

// Default/fallback if section isn’t recognized
const fallbackUrl = '/img/judy-du-snow.jpg';

// Preload images to avoid flicker
function preloadImages(urls: string[]) {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

function getImage(section: string | undefined) {
  if (!section) return fallbackUrl;
  return imageMap[section] ?? fallbackUrl;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ section }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Preload images when component mounts
  useEffect(() => {
    const allUrls = Object.values(imageMap);
    preloadImages([...allUrls, fallbackUrl]);
  }, []);

  // Current background URL
  const [currentBg, setCurrentBg] = useState(() => getImage('hero'));

  // Next background we crossfade into
  const [nextBg, setNextBg] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);

  // Keep video playback rate normal
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  // Whenever section changes => crossfade
  useEffect(() => {
    const newUrl = getImage(section);

    // If same URL, do nothing
    if (newUrl === currentBg) return;

    // Start fade
    setNextBg(newUrl);
    setIsFading(true);

    // After 0.5s, finalize
    const timer = setTimeout(() => {
      setCurrentBg(newUrl);
      setNextBg(null);
      setIsFading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [section, currentBg]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* LAYER 1: current background */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center bg-no-repeat
          transition-opacity duration-500
        "
        style={{
          backgroundImage: `url('${currentBg}')`,
          opacity: 1, // always visible for the "bottom" layer
        }}
      />

      {/* LAYER 2: next background (crossfade on top) */}
      {nextBg && (
        <div
          className="
            absolute inset-0
            bg-cover bg-center bg-no-repeat
            transition-opacity duration-500
          "
          style={{
            backgroundImage: `url('${nextBg}')`,
            opacity: isFading ? 1 : 0,
          }}
        />
      )}

      {/* The video layer, partially transparent */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.4 }}
      >
        <source src="/video/freecompress-pink-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
