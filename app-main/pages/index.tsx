import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CurriculumVitaeSection from '../components/CurriculumVitaeSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';
import VideoBackground from '../components/VideoBackground';

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [showNav, setShowNav] = useState(false);

  // We'll hold a ref to the <main> element where scrolling happens
  const mainRef = useRef<HTMLDivElement | null>(null);

  //
  // (1) OPTIONAL: IntersectionObserver to update the URL hash
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
  // (2) Hide/Show nav based on scrolling inside mainRef
  //
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
  
    function handleScroll() {
      // Make sure mainEl is still valid
      if (!mainRef.current) return;
  
      // If we still have a container, read its scrollTop
      if (mainRef.current.scrollTop > 80) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }
  
    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //
  // (3) IntersectionObserver references
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

      {/* Foreground flex: nav (conditionally) + main content */}
      <div className="relative z-10 flex min-h-screen w-full">
        {/* Show Nav if we've scrolled > 80px */}
        {showNav && (
          <aside className="w-1/4 flex-shrink-0 bg-gray-900">
            <Navigation />
          </aside>
        )}

        {/* Main scroll container - attach ref & enable scroll snapping */}
        <main
          ref={mainRef}
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
