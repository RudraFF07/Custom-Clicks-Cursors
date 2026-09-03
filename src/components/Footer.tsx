import React from 'react';
import { CursorIcon } from './CursorIcon';
import { APP_CONFIG } from '../config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-14 sm:py-18 bg-[#FBFBFD] dark:bg-[#07080A] border-t border-neutral-200/80 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-neutral-200/70 dark:border-neutral-800/60">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src={`${import.meta.env.BASE_URL}customclick-icon.png`}
              alt="Custom Clicks Icon"
              className="w-7 h-7 rounded-lg object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
              {APP_CONFIG.name}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button
              onClick={() => scrollTo('features')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('hero-demo')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => scrollTo('privacy')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </button>
            <a
              href={APP_CONFIG.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={APP_CONFIG.urls.edgeStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Edge Store
            </a>
            <button
              onClick={() => scrollTo('download')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Firefox
            </button>
            <a
              href="https://github.com/vinceliuice/WhiteSur-cursors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              WhiteSur SVGs
            </a>
          </nav>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-neutral-400 dark:text-neutral-500">
          <p className="max-w-xl">
            {APP_CONFIG.disclaimer}
          </p>
          <p className="shrink-0 font-mono">
            &copy; {currentYear} {APP_CONFIG.name}. Released under {APP_CONFIG.license}.
          </p>
        </div>
      </div>
    </footer>
  );
};
