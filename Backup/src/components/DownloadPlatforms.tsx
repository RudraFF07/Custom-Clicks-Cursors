import React from 'react';
import { motion } from 'motion/react';
import { APP_CONFIG } from '../config';
import { ArrowUpRight, Download, Github } from 'lucide-react';
import { FirefoxIcon, EdgeIcon } from './BrowserIcons';

export const DownloadPlatforms: React.FC = () => {
  const renderBrowserIcon = (iconName: string) => {
    switch (iconName) {
      case 'edge':
        return <EdgeIcon size={34} />;
      case 'firefox':
        return <FirefoxIcon size={34} />;
      case 'github':
      default:
        return <Github size={32} className="text-neutral-900 dark:text-white" />;
    }
  };

  return (
    <section
      id="download"
      className="py-24 sm:py-32 bg-[#FBFBFD] dark:bg-[#0a0b0e] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-4 shadow-xs"
          >
            <Download size={12} className="text-emerald-500" />
            <span>Available Everywhere</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight"
          >
            Bring Custom Clicks to your browser.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal"
          >
            Choose where you browse. Simple, single-click install with zero permissions overhead.
          </motion.p>
        </div>

        {/* THREE Large Download Cards with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {APP_CONFIG.platforms.map((platform, idx) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-8 rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Bar with Platform Icon & Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs">
                    {renderBrowserIcon(platform.iconName)}
                  </div>

                  {platform.badgeText && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-700/60">
                      {platform.badgeText}
                    </span>
                  )}
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  {platform.title}
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {platform.subtitle}
                </p>

                {/* Rating or version pill */}
                <div className="mt-5 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  {platform.storeRating ? (
                    <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                      Rating: {platform.storeRating}
                    </span>
                  ) : (
                    <span>Version: {platform.version}</span>
                  )}
                </div>
              </div>

              {/* Action Button (Configurable URL, respects isLive flag) */}
              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                {platform.isLive ? (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-5 rounded-xl bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold transition-all active:scale-[0.98] shadow-sm flex items-center justify-between group-hover:shadow"
                  >
                    <span>{platform.ctaText}</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 px-5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>Coming Soon (Review in progress)</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
