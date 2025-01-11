// components/VideoBackground.tsx
import React, { useEffect, useRef } from 'react';

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Slow down the video playback
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
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source src="/video/freecompress-pink-background.mp4" type="video/mp4" />
      {/* If someone’s browser doesn't support <video> */}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
