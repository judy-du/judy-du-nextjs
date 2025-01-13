// components/Preloader.tsx
import React, { useEffect, useState } from 'react';
import VideoBackground from './VideoBackground';

/**
 *  Steps:
 *  0) Show only the video for 1 second
 *  1) Fade in Judy Du image
 *  2) Type the text (2 lines)
 *  3) Show the "Explore" button
 *  4) On click => fade out overlay => then scroll to #cv => call onDone()
 */
type PreloaderProps = {
  onDone: () => void;
};

export default function Preloader({ onDone }: PreloaderProps) {
  const [step, setStep] = useState(0);    // Controls the animation steps
  const [fadingOut, setFadingOut] = useState(false); // For the final fade-out

  // After 1 second, fade in the Judy Du image
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    return () => clearTimeout(t1);
  }, []);

  // Once typing finishes, show the Explore button
  const handleTypingDone = () => {
    setStep(3);
  };

  // Start typing step after the Judy Du image is fully visible
  const startTyping = () => {
    setStep(2);
  };

  // Click Explore => fade out => scroll to #cv => call onDone()
  const handleExploreClick = () => {
    setFadingOut(true);
    setTimeout(() => {
      // Hide the preloader & set cookie
      onDone();

      // Now scroll to #cv
      const cvSection = document.getElementById('cv');
      if (cvSection) {
        cvSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800); // match the fade duration
  };

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        transition-opacity duration-700
        ${fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* 1) VIDEO behind everything */}
      <VideoBackground />

      {/* 2) Semi-transparent overlay for image & text */}
      <div className="
        absolute inset-0
        flex flex-col items-center justify-center
        bg-black bg-opacity-30
        text-white text-center
        p-4
      ">
        {/* STEP 1 => Fade in Judy Du image */}
        <img
          src="/img/judy-du-navigation-logo.png"
          alt="Judy Du"
          className={`
            transition-opacity duration-1000 mb-4
            ${step >= 1 ? 'opacity-100' : 'opacity-0'}
            w-48 h-auto
          `}
          onTransitionEnd={() => {
            // Once the image fully fades in, begin typing after 0.3s
            if (step === 1) {
              setTimeout(() => {
                startTyping();
              }, 300);
            }
          }}
        />

        {/* STEP 2 => Type line 1, then line 2 */}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-semibold leading-relaxed mb-4">
              <TypeWriterGroup
                lines={[
                  'VISUALS THAT CAPTIVATE',
                  'STRATEGIES THAT RESONATE',
                ]}
                onComplete={handleTypingDone}
              />
            </div>
          </div>
        )}

        {/* STEP 3 => Show final text & Explore button */}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8">
              VISUALS THAT CAPTIVATE <br />
              STRATEGIES THAT RESONATE
            </p>
            <button
              onClick={handleExploreClick}
              className="
                relative
                text-white text-xl font-bold
                uppercase tracking-wider
                bg-transparent
                border-none
                cursor-pointer
                outline-none
              "
            >
              <span className="relative z-10">Explore</span>
              <span className="absolute inset-0 flex items-center justify-center -z-0">
                <span className="block w-12 h-3 bg-red-500 blur-md rounded-full animate-pulse" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * TypeWriterGroup:
 *   - Takes an array of lines, e.g. ["VISUALS THAT CAPTIVATE", "STRATEGIES THAT RESONATE"]
 *   - Types line 1 fully, then line 2, etc.
 *   - Calls onComplete() after the last line is typed.
 */
type TypeWriterGroupProps = {
  lines: string[];
  onComplete?: () => void;
};

function TypeWriterGroup({ lines, onComplete }: TypeWriterGroupProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleLineDone = () => {
    if (currentLine < lines.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      setFinished(true);
      onComplete?.();
    }
  };

  return (
    <>
      {lines.map((line, idx) => (
        <div key={idx}>
          {idx === currentLine && !finished ? (
            <TypeWriterText
              text={line}
              onComplete={handleLineDone}
              className="block"
            />
          ) : (
            // If typed in the past, just show it statically
            idx < currentLine && <div>{line}</div>
          )}
        </div>
      ))}
    </>
  );
}

/**
 * TypeWriterText:
 *   - Types out the given text once.
 *   - Calls onComplete() when done.
 */
type TypeWriterTextProps = {
  text: string;
  onComplete?: () => void;
  className?: string;
};

function TypeWriterText({ text, onComplete, className }: TypeWriterTextProps) {
  const [visible, setVisible] = useState('');

  useEffect(() => {
    let i = 0;
    const chars = text.split('');
    const id = setInterval(() => {
      if (i < chars.length) {
        setVisible((prev) => prev + chars[i]);
        i++;
      } else {
        clearInterval(id);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(id);
  }, [text, onComplete]);

  return <div className={className}>{visible}</div>;
}
