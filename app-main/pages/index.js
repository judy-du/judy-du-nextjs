import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoSegment from '../components/VideoSegment';

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Head>
        <title>Judy Du</title>
        <meta name="description" content="Welcome to Judy's World" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative flex-grow flex items-center justify-center bg-[#212846]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 video-container">
          <VideoSegment src="/video/startpage.mp4" id="video1" />
          <VideoSegment src="/video/startpage.mp4" id="video2" />
          <VideoSegment src="/video/startpage.mp4" id="video3" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center text-white text-container">
          <h1 className="text-3xl md:text-5xl font-bold animate-slide-in-right delay-1">
            WELCOME TO
          </h1>
          <h1
            className="text-5xl md:text-8xl font-bold animate-slide-in-right delay-2"
            id="judyWorld"
            style={{ fontSize: '8vw', fontWeight: 'bold' }}
          >
            JUDY'S WORLD
          </h1>
          <p className="text-xl mt-2 animate-slide-in-right delay-3">
            VELKOMMEN TIL MIN VERDEN
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
