import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CurriculumVitaeSection from '../components/CurriculumVitaeSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';
import VideoBackground from '../components/VideoBackground';

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [showNav, setShowNav] = useState(false);

  //
  // (1) IntersectionObserver to update URL hash (optional)
  //
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            window.history.pushState(null, '', `#${sectionId}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.5,
    });

    sectionsRef.current.forEach((section) => observer.observe(section));
    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, []);

  //
  // (2) Hide/Show nav based on Hero bounding rect
  //
  useEffect(() => {
    const heroElement = document.getElementById('hero');
    if (!heroElement) return;

    function handleScroll() {
      const rect = heroElement.getBoundingClientRect();
      // If the bottom of hero is above or at the top of the viewport => hero is off-screen
      if (rect.bottom <= 0) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position (in case user is already scrolled)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //
  // (3) Store references for IntersectionObserver (if needed)
  //
  const setSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  //
  // (4) Layout
  //
  return (
    <div className="relative min-h-screen w-full overflow-hidden scroll-smooth">
      {/* Full-page background video behind nav & content */}
      <VideoBackground />

      <div className="relative z-10 flex min-h-screen w-full">
        {/* Conditionally render the Nav if showNav is true */}
        {showNav && (
          <aside className="w-1/4 flex-shrink-0 bg-gray-900">
            <Navigation />
          </aside>
        )}

        {/* Main scroll container with scroll snapping (optional) */}
        <main
          className="
            flex-1
            text-white
            overflow-auto
            snap-y
            snap-mandatory
          "
        >
          <section
            id="hero"
            ref={setSectionRef}
            className="
              h-screen
              snap-start
              flex
              items-center
              justify-center
            "
          >
            <HeroSection />
          </section>

          <section
            id="cv"
            ref={setSectionRef}
            className="
              h-screen
              snap-start
              flex
              items-center
              justify-center
            "
          >
            <CurriculumVitaeSection />
          </section>

          <section
            id="contact"
            ref={setSectionRef}
            className="
              h-screen
              snap-start
              flex
              items-center
              justify-center
            "
          >
            <ContactSection />
          </section>
        </main>
      </div>
    </div>
  );
}
