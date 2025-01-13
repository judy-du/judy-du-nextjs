// components/Navigation.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navigation.module.css';

interface NavigationProps {
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLinkClick }) => {
  // Hide on server; show after mount/hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const router = useRouter();

  const isActive = (hash: string) => router.asPath === hash;

  if (!hydrated) return null;

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

      <div className="flex-grow flex items-center pl-10">
        <nav className="flex flex-col space-y-4 text-lg uppercase tracking-wide">
          <Link
            href="/#cv"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#cv') ? styles.navLinkActive : ''}
            `}
          >
            Curriculum Vitae
          </Link>

          {/* NEW Link #academic-projects */}
          <Link
            href="/#academic-projects"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#academic-projects') ? styles.navLinkActive : ''}
            `}
          >
            Academic Projects
          </Link>

          {/* NEW Link #portfolio */}
          <Link
            href="/#portfolio"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#portfolio') ? styles.navLinkActive : ''}
            `}
          >
            Portfolio
          </Link>

          <Link
            href="/#contact"
            scroll={false}
            onClick={handleLinkClick}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#contact') ? styles.navLinkActive : ''}
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
