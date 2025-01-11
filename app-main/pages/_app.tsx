// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import VideoBackground from '../components/VideoBackground';

/**
 * Root layout: we fix the entire page to 100vw x 100vh,
 * then place the background video behind everything,
 * and the actual page content in front.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background video behind everything */}
      <VideoBackground />

      {/* Foreground container for the page */}
      <div className="relative z-10 w-full h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
