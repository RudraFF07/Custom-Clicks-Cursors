import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config';
import { Menu, X, ArrowUpRight, Github, Sun, Moon } from 'lucide-react';
import { FirefoxIcon, EdgeIcon } from './BrowserIcons';
import { getAssetUrl } from '../utils/assets';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0c0d10]/85 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-white rounded-lg p-1"
          aria-label="Custom Clicks Cursor Home"
        >
          <img
            src={getAssetUrl('customclick-icon.png')}
            alt="Custom Clicks Cursor Icon"
            className="w-8 h-8 rounded-lg shadow-sm object-cover transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white leading-none">
              Custom Clicks
            </span>
            <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 tracking-normal mt-0.5">
              Cursor
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/80 dark:bg-neutral-900/80 p-1 rounded-full border border-black/[0.05] dark:border-white/[0.08] backdrop-blur-sm">
          <button
            onClick={() => scrollTo('hero-demo')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            Preview
          </button>
          <button
            onClick={() => scrollTo('showcase')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('protection')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            Protection
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('privacy')}
            className="px-3.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-full transition-colors focus:outline-none"
          >
            Privacy
          </button>
        </nav>

        {/* Right Action / CTAs & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Toggle Button in Desktop Header */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun size={17} className="text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon size={17} className="text-neutral-700 transition-transform rotate-0 hover:-rotate-12" />
            )}
          </button>

          <a
            href={APP_CONFIG.urls.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all"
            aria-label="GitHub Repository"
          >
            <Github size={15} />
            <span className="hidden xl:inline">GitHub</span>
          </a>

          {/* Real Edge Icon CTA */}
          <a
            id="nav-get-edge-btn"
            href={APP_CONFIG.urls.edgeStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-100 text-xs font-semibold px-3 py-2 rounded-full border border-neutral-300/80 dark:border-neutral-700 shadow-xs transition-all active:scale-95"
          >
            <EdgeIcon size={16} />
            <span>Edge Store</span>
          </a>

          {/* Real Firefox Icon CTA */}
          <button
            id="nav-get-firefox-btn"
            onClick={() => scrollTo('download')}
            className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold px-3.5 py-2 rounded-full shadow-sm hover:shadow transition-all active:scale-95"
          >
            <FirefoxIcon size={16} />
            <span>Get for Firefox</span>
          </button>
        </div>

        {/* Mobile Nav Actions (Theme Toggle + Get + Hamburger) */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            id="mobile-theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Toggle visual theme"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          <button
            id="mobile-nav-cta-btn"
            onClick={() => scrollTo('download')}
            className="bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full dark:bg-white dark:text-neutral-900"
          >
            Get
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-[#0e1014]/95 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-xl shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => scrollTo('hero-demo')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              Preview Demo
            </button>
            <button
              onClick={() => scrollTo('showcase')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              90+ Cursor Gallery
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              Core Features
            </button>
            <button
              onClick={() => scrollTo('protection')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              Web App Protection
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('privacy')}
              className="text-left px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 rounded-lg"
            >
              Privacy Architecture
            </button>
          </nav>

          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => scrollTo('download')}
              className="w-full py-2.5 px-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FirefoxIcon size={16} />
              <span>Get for Firefox</span>
            </button>
            <a
              href={APP_CONFIG.urls.edgeStore}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-200 dark:border-neutral-700"
            >
              <EdgeIcon size={16} />
              <span>Microsoft Edge Store</span>
            </a>
            <a
              href={APP_CONFIG.urls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 text-neutral-600 dark:text-neutral-400 text-xs font-medium flex items-center justify-center gap-2"
            >
              <Github size={14} />
              <span>View Source on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
