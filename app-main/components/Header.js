// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Home Link */}
        <Link href="/" className="flex items-center">
          <Image
            src="/img/profile-picture-removebg-preview.png"
            alt="Judy Du"
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
          <span className="font-bold">JUDY DU</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a
            href="/judydu-portfolio.pdf"
            className="hover:bg-gray-300 px-2 py-1 rounded"
          >
            PORTFOLIO
          </a>
          <a
            href="/judydu-cv.pdf"
            className="hover:bg-gray-300 px-2 py-1 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>
      </nav>
    </header>
  );
}
