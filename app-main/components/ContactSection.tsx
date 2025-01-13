// components/ContactSection.tsx

import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div
      className="
        relative
        w-full
        h-full
        px-6 py-6
        text-center
        flex flex-col items-center justify-center

        /* On md+ screens, shift content right so it doesn’t overlap the nav */
        md:ml-[25%]
        overflow-x-hidden
      "
    >
      <h2 className="text-6xl md:text6xl font-bold mb-2 font-now">JUDY DU</h2>
      <p className="text-2xl mb-1 font-now">+45 60907298</p>
      <p className="text-2xl mb-1 font-now">KONTAKT@JUDYDU.DK</p>
      <p className="text-2xl mb-1 font-now">VINKELVEJ 12D, 2800 KONGENS LYNGBY</p>
    </div>
  );
};

export default ContactSection;
