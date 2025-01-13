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

  // If we haven't been here before, show the preloader.
  const [showPreloader, setShowPreloader] = useState(false);

  // Check cookie client-side (no SSR)
  useEffect(() => {
    const hasBeenHereCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('beenHereBefore='));
    if (!hasBeenHereCookie) {
      setShowPreloader(true);
    }
  }, []);

  // Once preloader finishes, set cookie & hide preloader
  const handlePreloaderDone = () => {
    document.cookie = `beenHereBefore=true; max-age=${60 * 60 * 24 * 365}; path=/;`;
    setShowPreloader(false);
  };

  // Normal page logic
  const [hydrated, setHydrated] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

  // Mark hydration done (avoid SSR mismatch)
  useEffect(() => {
    setHydrated(true);
  }, []);

  // IntersectionObserver for highlighting sections
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

  // Hide/show nav after scrolling >80px (desktop only)
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

  // Helper to store section refs
  const setSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Show preloader if needed */}
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}

      <div className="relative w-full h-full overflow-hidden scroll-smooth">
        {/* MOBILE HEADER (fixed top). Set height so content can start below it. */}
        <header
          className="
            md:hidden
            fixed top-0 left-0
            w-full h-16  /* ensures a fixed 4rem height for the header */
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

        {/* MOBILE MENU */}
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
              <Navigation onLinkClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </nav>
        )}

        {/* DESKTOP NAV after scroll */}
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
            <Navigation />
          </aside>
        )}

        <main
          ref={mainRef}
          className="
            w-full
            h-full
            text-white
            overflow-auto
            snap-y snap-mandatory
            relative

            /* On mobile, add top padding = header height so content isn't hidden. */
            pt-16

            /* On md+ screens, no extra top padding because nav is on the left. */
            md:pt-0
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
