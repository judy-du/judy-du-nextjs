// components/Footer.js
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto flex items-center justify-center p-4 space-x-6">
        <a
          href="https://www.linkedin.com/in/judy-du-978223270"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://www.instagram.com/due_rrr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://github.com/judy-du"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-900"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
}
