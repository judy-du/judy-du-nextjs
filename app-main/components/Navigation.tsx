// components/Navigation.tsx

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentSection?: string; // <-- from HomeClientOnly
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onLinkClick }) => {
  // Hide on server; show after mount/hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  // Determine if a nav link is active based on the currentSection
  const isActive = (sectionId: string) => currentSection === sectionId;

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <aside className="h-full flex flex-col text-white font-now">
      {/* Logo linking to #hero */}
      <div className="flex-shrink-0 pt-10 pl-10">
        <Link
          href="/#hero"
          scroll={false}
          className="cursor-pointer"
          onClick={handleLinkClick}
        >
          <img
            src="/img/judy-du-navigation-logo.png"
            alt="Judy Du"
            className="h-12 w-auto mb-4"
          />
        </Link>
      </div>

      {/* Main Nav Links */}
      <div className="flex-grow flex items-center pl-10">
        <nav className="flex flex-col space-y-4 text-lg uppercase tracking-wide">
          {/* Match the same order in HomeClientOnly */}
   

          {/* 2. Curriculum Vitae */}
          <Link
            href="/#cv"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('cv') ? styles.navLinkActive : ''}
            `}
          >
            Curriculum Vitae
          </Link>

          {/* 3. Academic Projects */}
          <Link
            href="/#academic-projects"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('academic-projects') ? styles.navLinkActive : ''}
            `}
          >
            Academic Projects
          </Link>

          {/* 4. Portfolio */}
          <Link
            href="/#portfolio"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('portfolio') ? styles.navLinkActive : ''}
            `}
          >
            Portfolio
          </Link>

          {/* 5. Contact */}
          <Link
            href="/#contact"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('contact') ? styles.navLinkActive : ''}
            `}
          >
            Contact Me
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Navigation;
