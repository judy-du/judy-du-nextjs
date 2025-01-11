// components/VideoBackground.tsx
import React, { useEffect, useRef } from 'react';

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Slow down the video playback if desired
      videoRef.current.playbackRate = 0.1;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      // Force 100vw x 100vh (object-cover keeps the aspect ratio)
      className="absolute top-0 left-0 w-screen h-screen object-cover z-0"
    >
      <source src="/video/freecompress-pink-background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
