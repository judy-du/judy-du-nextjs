// components/HomeClientOnly.tsx

import React, { useEffect, useRef, useState } from 'react';
import HeroSection from './HeroSection';
import CurriculumVitaeSection from './CurriculumVitaeSection';
import AcademicProjectsSection from './AcademicProjectsSection';
import PortfolioSection from './PortfolioSection';
import ContactSection from './ContactSection';
import Navigation from './Navigation';
import Preloader from './Preloader';

const HomeClientOnly: React.FC = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mainRef = useRef<HTMLDivElement | null>(null);

  // (1) Show preloader if user hasn't visited
  const [showPreloader, setShowPreloader] = useState(false);

  // Check cookie client-side (no SSR)
  useEffect(() => {
    const hasCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('beenHereBefore='));
    if (!hasCookie) {
      setShowPreloader(true);
    }
  }, []);

  // Once preloader finishes => set cookie & hide it
  const handlePreloaderDone = () => {
    document.cookie = `beenHereBefore=true; max-age=${60 * 60 * 24 * 365}; path=/;`;
    setShowPreloader(false);
  };

  // (2) Normal page logic
  const [hydrated, setHydrated] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track which section is currently visible
  const [currentSection, setCurrentSection] = useState('hero');

  // Avoid SSR mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  // (3) IntersectionObserver for highlighting sections
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            window.history.pushState(null, '', `/#${sectionId}`);
            setCurrentSection(sectionId);
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

  // (4) Hide/show nav after scrolling >80px (desktop only)
  useEffect(() => {
    if (!hydrated) return;
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      setShowNav(mainEl.scrollTop > 80);
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, [hydrated]);

  // Helper for IntersectionObserver: store each section ref
  const setSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* (5) Show PRELOADER if needed */}
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}

      <div className="relative w-full h-full overflow-hidden scroll-smooth">
        {/* (6) MOBILE HEADER */}
        <header
          className="
            md:hidden
            fixed top-0 left-0
            w-full h-16
            z-50
            flex items-center justify-between
            px-4
            bg-black bg-opacity-70
            text-white
          "
        >
          <div>{currentSection.toUpperCase()}</div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* (7) MOBILE MENU */}
        {isMobileMenuOpen && (
          <nav
            className="
              md:hidden
              fixed top-0 left-0
              w-full h-screen
              bg-black bg-opacity-80
              z-50
              flex flex-col
            "
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Navigation"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow flex items-center justify-center">
              <Navigation
                currentSection={currentSection}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </nav>
        )}

        {/* (8) DESKTOP NAV (appears after scroll) */}
        {hydrated && showNav && (
          <aside
            className="
              hidden md:block
              absolute top-0 left-0
              w-1/4
              h-full
              z-50
              bg-transparent
            "
          >
            <Navigation currentSection={currentSection} />
          </aside>
        )}

        {/* (9) MAIN CONTENT */}
        <main
          ref={mainRef}
          className="
            w-full
            h-full
            text-white
            overflow-auto
            snap-y snap-mandatory
            relative
            pt-16  /* space for mobile header */
            md:pt-0 /* no top padding on desktop */
          "
        >
          <section
            id="hero"
            ref={setSectionRef}
            className="h-screen snap-start flex items-center justify-center"
          >
            <HeroSection />
          </section>

          <section
            id="cv"
            ref={setSectionRef}
            className="h-screen snap-start flex items-center justify-center"
          >
            <CurriculumVitaeSection />
          </section>

          <section
            id="academic-projects"
            ref={setSectionRef}
            className="h-screen snap-start flex items-center justify-center"
          >
            <AcademicProjectsSection />
          </section>

          <section
            id="portfolio"
            ref={setSectionRef}
            className="h-screen snap-start flex items-center justify-center"
          >
            <PortfolioSection />
          </section>

          <section
            id="contact"
            ref={setSectionRef}
            className="h-screen snap-start flex items-center justify-center"
          >
            <ContactSection />
          </section>
        </main>
      </div>
    </>
  );
};

export default HomeClientOnly;
