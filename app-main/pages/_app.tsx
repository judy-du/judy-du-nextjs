// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import VideoBackground from '../components/VideoBackground';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Pink-ish background video behind everything */}
      <VideoBackground />

      <div className="relative z-10 w-full min-h-screen">
        {/* Render whichever page (or route) is active */}
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
