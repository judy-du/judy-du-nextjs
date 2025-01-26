// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // Keep _app minimal; do NOT render VideoBackground here
  return <Component {...pageProps} />;
}

export default MyApp;
