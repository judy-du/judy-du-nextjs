// components/VideoBackground.tsx
import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  section?: string; 
  // e.g. 'hero', 'academic-projects', 'portfolio', etc.
}

const imageMap: Record<string, string> = {
  'hero': '/img/judy-du-snow.jpg',
  'academic-projects': '/img/judy-du-education.jpg',
  // Add more mappings for other sections if needed
};

const fallbackImage = '/img/judy-du-snow.jpg'; // default

// Preload your images so there's no flicker
function preloadImages(urls: string[]) {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ section }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // On mount, preload all images
  useEffect(() => {
    const allImages = Object.values(imageMap);
    preloadImages(allImages);
  }, []);

  // The background currently being displayed
  const [currentBg, setCurrentBg] = useState(fallbackImage);

  // The background we will fade in
  const [nextBg, setNextBg] = useState<string | null>(null);

  // State to control if we're in the middle of a fade
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  // Whenever the `section` changes, pick the new image and start crossfade
  useEffect(() => {
    // Figure out which image to use for this section
    const newImage = imageMap[section || 'hero'] || fallbackImage;

    // If it's the same as current, do nothing
    if (newImage === currentBg) return;

    // Set it as nextBg so the top layer uses the new image
    setNextBg(newImage);
    // Trigger fade
    setIsFading(true);

    // After .5s fade, we finalize the new image as "current"
    const timer = setTimeout(() => {
      setCurrentBg(newImage);
      setNextBg(null); // hide top layer
      setIsFading(false);
    }, 500); // match the CSS duration

    return () => clearTimeout(timer);
  }, [section, currentBg]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: The "current" background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url('${currentBg}')`,
          // If we're fading, the currentBg is behind the top layer
          // no opacity change needed for the bottom layer
          opacity: 1,
        }}
      />

      {/* Layer 2: The "next" background (fades in on top) */}
      {nextBg && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url('${nextBg}')`,
            // If isFading is true => we fade from 0 -> 1
            opacity: isFading ? 1 : 0,
          }}
        />
      )}

      {/* The video itself, behind a half-transparent layer */}
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
      </video>
    </div>
  );
};

export default VideoBackground;
