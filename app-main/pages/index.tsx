// pages/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CurriculumVitaeSection from '../components/CurriculumVitaeSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [showNav, setShowNav] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  //
  // (1) IntersectionObserver to update the URL hash (#cv, #contact, etc.)
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
  // (2) Hide/Show nav after scrolling > 80px inside <main>
  //
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    function handleScroll() {
      if (!mainRef.current) return;
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
  // (3) Keep track of section refs (for IntersectionObserver)
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
    <div className="relative w-full h-full overflow-hidden scroll-smooth">
      <div className="relative z-10 flex w-full h-full">
        {/* Show Nav after scroll > 80px */}
        {showNav && (
          <aside className="w-1/4 flex-shrink-0">
            <Navigation />
          </aside>
        )}

        {/* Main scroll container: each section = 1 screen (h-screen) */}
        <main
          ref={mainRef}
          className="
            flex-1
            h-full
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
