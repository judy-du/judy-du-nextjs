// components/ContactSection.tsx
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-3xl font-bold mb-2">JUDY DU</h2>
      <p className="text-xl mb-1">+45 60907298</p>
      <p className="text-xl mb-1">KONTAKT@JUDYDU.DK</p>
      <p className="text-xl mb-1">VINKELVEJ 12D, 2800 KONGENS LYNGBY</p>
    </section>
  );
};

export default ContactSection;
