// components/Navigation.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  // We will hide the nav on server, then show on client once hydrated
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const router = useRouter();
  const currentHash = router.asPath; // e.g. "/#cv"

  const isActive = (hash: string) => currentHash === hash;

  // If we're not hydrated yet, return null (no nav on server)
  if (!hydrated) {
    return null;
  }

  return (
    <aside className="h-full flex flex-col text-white font-now">
      <div className="flex-shrink-0 pt-10 pl-10">
        <Link href="/#hero" scroll={false} className="cursor-pointer">
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
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#cv') ? styles.navLinkActive : ''}
            `}
          >
            CV
          </Link>

          <Link
            href="/judydu-portfolio.pdf"
            target="_blank"
            className={`${styles.navLink} hover:opacity-80`}
          >
            Portfolio
          </Link>

          <Link
            href="/#education"
            scroll={false}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#education') ? styles.navLinkActive : ''}
            `}
          >
            Education
          </Link>

          <Link
            href="/#about"
            scroll={false}
            className={`
              hover:opacity-80
              ${styles.navLink}
              ${isActive('/#about') ? styles.navLinkActive : ''}
            `}
          >
            More About Me
          </Link>

          <Link
            href="/#contact"
            scroll={false}
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
