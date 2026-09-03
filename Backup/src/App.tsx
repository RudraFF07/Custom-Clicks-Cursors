/**
 * Custom Clicks Cursor — Landing Page
 * Modern macOS-inspired product website for a browser cursor replacement extension.
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CursorGallery } from './components/CursorGallery';
import { InteractiveMotionDemo } from './components/InteractiveMotionDemo';
import { FeatureSection } from './components/FeatureSection';
import { ProtectionSection } from './components/ProtectionSection';
import { PrivacySection } from './components/PrivacySection';
import { HowItWorks } from './components/HowItWorks';
import { VideoShowcase } from './components/VideoShowcase';
import { DownloadPlatforms } from './components/DownloadPlatforms';
import { GithubSection } from './components/GithubSection';
import { Footer } from './components/Footer';
import { Moon, Sun, ArrowUp } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('custom_clicks_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Sync theme with HTML root and body class list
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('custom_clicks_theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('custom_clicks_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B0E] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Navigation with Theme State */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* 1. Hero Section & Interactive Browser Window Visual */}
        <Hero />

        {/* 2. Cursor Showcase: 90+ ways to point */}
        <CursorGallery />

        {/* 3. Interactive Product Demo: See it in motion */}
        <InteractiveMotionDemo />

        {/* 4. Editorial Features: Small extension. Big difference. */}
        <FeatureSection />

        {/* 5. Smart Web Protection: Designed to know when to stay out of the way */}
        <ProtectionSection />

        {/* 6. Privacy: 100% LOCAL. Your browsing stays yours. */}
        <PrivacySection />

        {/* 7. How it Works: 4-step timeline */}
        <HowItWorks />

        {/* 8. Video Showcase: Made for every interaction */}
        <VideoShowcase />

        {/* 9. Download Section: Edge, Firefox, GitHub */}
        <DownloadPlatforms />

        {/* 10. Open Source: Built in the open */}
        <GithubSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating System Controls (Theme Toggle & Scroll To Top) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-floating-btn"
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-800 shadow-md hover:shadow-lg backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle visual theme"
        >
          {isDarkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            id="scroll-to-top-btn"
            onClick={scrollToTop}
            className="p-3 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
