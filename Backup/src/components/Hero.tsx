import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BrowserDemo } from './BrowserDemo';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { CursorIcon } from './CursorIcon';
import { FirefoxIcon, EdgeIcon } from './BrowserIcons';
import { APP_CONFIG } from '../config';

interface HeroProps {
  onExploreClick?: () => void;
  onGetClicksClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onGetClicksClick }) => {
  const { scrollY } = useScroll();

  // Smooth parallax offsets
  const parallaxBgY = useTransform(scrollY, [0, 800], [0, 120]);
  const floatingCursorLeftY = useTransform(scrollY, [0, 800], [0, -80]);
  const floatingCursorRightY = useTransform(scrollY, [0, 800], [0, 100]);
  const demoParallaxY = useTransform(scrollY, [0, 800], [0, -30]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-white dark:bg-[#0a0b0e] transition-colors duration-300"
    >
      {/* Subtle radial ambient highlight with parallax drift */}
      <motion.div
        style={{ y: parallaxBgY }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-tr from-neutral-200/50 via-neutral-100/40 to-neutral-200/20 dark:from-neutral-800/30 dark:via-neutral-900/40 dark:to-neutral-800/10 blur-[130px] pointer-events-none rounded-full"
      />

      {/* Decorative floating cursors with independent parallax drift */}
      <motion.div
        style={{ y: floatingCursorLeftY }}
        className="absolute top-36 left-8 lg:left-24 opacity-30 dark:opacity-25 hidden md:block pointer-events-none -rotate-12"
      >
        <CursorIcon type="pointer" size={42} variant="dark" className="dark:hidden" />
        <CursorIcon type="pointer" size={42} variant="light" className="hidden dark:inline-block" />
      </motion.div>

      <motion.div
        style={{ y: floatingCursorRightY }}
        className="absolute top-64 right-10 lg:right-28 opacity-30 dark:opacity-25 hidden md:block pointer-events-none rotate-12"
      >
        <CursorIcon type="text" size={38} variant="dark" className="dark:hidden" />
        <CursorIcon type="text" size={38} variant="light" className="hidden dark:inline-block" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow / Badge with App Icon */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-6 shadow-xs backdrop-blur-xs"
        >
          <img
            src={`${import.meta.env.BASE_URL}customclick-icon.png`}
            alt="Custom Clicks Icon"
            className="w-4 h-4 rounded-full object-cover shadow-xs"
            referrerPolicy="no-referrer"
          />
          <span>THE MODERN CURSOR FOR THE WEB</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto"
        >
          Transform <br />
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 mt-1">
            Your Browsing.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Replace ordinary web cursors with crisp, handcrafted vector designs built for modern browsing.
        </motion.p>

        {/* CTAs with Real Firefox and Edge Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          {/* Firefox CTA Button with Real Official Firefox Icon */}
          <button
            id="hero-firefox-cta"
            onClick={() => (onGetClicksClick ? onGetClicksClick() : handleScrollTo('download'))}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 group"
          >
            <FirefoxIcon size={20} className="transition-transform group-hover:scale-110" />
            <span>Get It for Firefox</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          {/* Microsoft Edge Store CTA Button with Real Official Edge Icon */}
          <a
            id="hero-edge-cta"
            href={APP_CONFIG.urls.edgeStore}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-900/90 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm font-semibold border border-neutral-300/80 dark:border-neutral-700 shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 group"
          >
            <EdgeIcon size={20} className="transition-transform group-hover:scale-110" />
            <span>Get from Edge Store</span>
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Explore Cursors Secondary Button */}
          <button
            id="hero-secondary-cta"
            onClick={() => (onExploreClick ? onExploreClick() : handleScrollTo('showcase'))}
            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 text-sm font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore the cursors</span>
            <ArrowDown size={14} className="text-neutral-400" />
          </button>
        </motion.div>

        {/* Trust / Privacy Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium"
        >
          <span>Free</span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span>Private</span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span>Offline</span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span>No tracking</span>
        </motion.div>

        {/* Interactive Browser Window Mockup with Parallax */}
        <motion.div
          style={{ y: demoParallaxY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16"
        >
          <BrowserDemo />
        </motion.div>
      </div>
    </section>
  );
};
