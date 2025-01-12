// pages/index.tsx

import React, { useEffect, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import CurriculumVitaeSection from '../components/CurriculumVitaeSection';
import ContactSection from '../components/ContactSection';
import Navigation from '../components/Navigation';

export default function Home() {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const mainRef = useRef<HTMLDivElement | null>(null);

  // (A) Track hydration (avoid SSR mismatch)
  const [hydrated, setHydrated] = useState(false);

  // (B) Scroll-based state for nav (desktop)
  const [showNav, setShowNav] = useState(false);

  // (C) For mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // (D) Track currently visible section (for label)
  const [currentSection, setCurrentSection] = useState('hero');

  //
  // (1) IntersectionObserver
  //
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            // Use a leading slash (optional):
            window.history.pushState(null, '', `/#${sectionId}`);
            setCurrentSection(sectionId); // <--- Update state
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.5, // highlight once 50% of the section is visible
    });

    sectionsRef.current.forEach((section) => observer.observe(section));
    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, []);

  //
  // (A) Hydration
  //
  useEffect(() => {
    setHydrated(true);
  }, []);

  //
  // (2) Hide/show nav after scrolling >80px (only if hydrated) - DESKTOP ONLY
  //
  useEffect(() => {
    if (!hydrated) return; // Skip on server
    const mainEl = mainRef.current;
    if (!mainEl) return;

    function handleScroll() {
      if (!mainEl) return;
      setShowNav(mainEl.scrollTop > 80);
    }

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial
    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, [hydrated]);

  //
  // (3) Store references for IntersectionObserver
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

      {/* 
        MOBILE HEADER (visible on small screens). 
        Fixed at the top, with current section label (left) and burger (right).
      */}
      <header
        className="
          md:hidden
          fixed top-0 left-0
          w-full z-50
          flex items-center justify-between
          p-4
          bg-black bg-opacity-70
          text-white
        "
      >
        <div>{currentSection.toUpperCase()}</div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {/* A simple 'burger' icon (3 stacked lines) */}
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

      {/* 
        MOBILE MENU (slide down or overlay if open). 
        Re-uses the same <Navigation /> links, 
        but we can wrap them in a small menu panel.
      */}
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
          {/* Close button in top-right */}
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
            {/* Reuse existing nav links */}
            <Navigation onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </nav>
      )}

      {/* DESKTOP: Left side nav, appears after scroll */}
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
          snap-y
          snap-mandatory
          relative
          pt-16 md:pt-0
          " 
        /* ^ add pt-16 so content isn't hidden behind the mobile header */
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
  );
}
