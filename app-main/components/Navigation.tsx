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
  const currentHash = router.asPath; // e.g. "/#cv"

  const isActive = (hash: string) => currentHash === hash;

  // If not hydrated, return nothing
  if (!hydrated) {
    return null;
  }

  // We can pass an onClick to each link that closes the mobile menu
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
