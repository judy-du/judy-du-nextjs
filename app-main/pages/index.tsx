// pages/index.tsx
import dynamic from 'next/dynamic';

// Dynamically import the "HomeClientOnly" component with SSR disabled
const HomeClientOnly = dynamic(() => import('../components/HomeClientOnly'), {
  ssr: false, // <-- No server-side rendering for this page
});

export default function IndexPage() {
  return <HomeClientOnly />;
}
