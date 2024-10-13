// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoSegment from '../components/VideoSegment';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Head>
        <title>Judy Du</title>
        <meta name="description" content="Welcome to Judy's World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow relative bg-[#212846]">
        {/* Video Background */}
        <div className="absolute inset-0 flex z-0">
          <VideoSegment src="/video/startpage.mp4" id="video1" />
          <VideoSegment src="/video/startpage.mp4" id="video2" />
          <VideoSegment src="/video/startpage.mp4" id="video3" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold">WELCOME TO</h1>
          <h1
            className="text-5xl md:text-8xl font-bold"
            id="judyWorld"
            style={{ fontSize: '8vw', fontWeight: 'bold' }}
          >
            JUDY'S WORLD
          </h1>
          <p className="text-xl mt-2">VELKOMMEN TIL MIN VERDEN</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
