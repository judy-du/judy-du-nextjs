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
  // (B) Scroll-based state for nav
  const [showNav, setShowNav] = useState(false);

  //
  // (1) IntersectionObserver (optional)
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
  // (A) Mark that we've reached the client (hydration)
  //
  useEffect(() => {
    setHydrated(true);
  }, []);

  //
  // (2) Hide/show nav after scrolling >80px (only if hydrated)
  //
  useEffect(() => {
    if (!hydrated) return; // Skip on server

    const mainEl = mainRef.current;
    if (!mainEl) return;

    function handleScroll() {
      if (!mainEl) return;
      if (mainEl.scrollTop > 80) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    }

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll
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
      {/* Render nav ONLY if hydrated + scrolled >80px */}
      {hydrated && showNav && (
        <aside className="absolute top-0 left-0 w-1/4 h-full z-50 bg-transparent">
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
  );
}
