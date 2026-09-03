import React from 'react';
import { CursorIcon } from './CursorIcon';
import { FeatureItem } from '../types';

export const FeatureSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      number: '01',
      title: 'Zero Flicker',
      description: 'Instant cursor transitions without distracting visual stutters.',
      tag: 'Hardware Accelerated',
    },
    {
      number: '02',
      title: '90+ Vector Cursors',
      description: 'A complete cursor system covering everyday web interactions.',
      tag: 'WhiteSur Geometry',
    },
    {
      number: '03',
      title: 'Smart Web Protection',
      description:
        'Preserves custom cursors and respects cursor:none experiences such as games, canvas tools, and fullscreen video interfaces.',
      tag: 'Auto-Bypass Engine',
    },
    {
      number: '04',
      title: 'Per-Site Controls',
      description: 'Quickly pause or enable Custom Clicks for individual websites.',
      tag: 'One-Click Toggle',
    },
    {
      number: '05',
      title: 'Visual Settings',
      description: 'Fine-tune cursor mappings, hotspots, and preferences.',
      tag: 'Sub-Pixel Precision',
    },
    {
      number: '06',
      title: 'Privacy First',
      description: 'No tracking. No analytics. No ads. No external connections.',
      tag: 'Offline Sandbox',
    },
  ];

  // Visual cursor accent mapping for cards
  const cursorAccents = ['pointer', 'text', 'grab', 'ew-resize', 'crosshair', 'default'];

  return (
    <section
      id="features"
      className="py-20 sm:py-28 bg-[#FBFBFD] dark:bg-[#0c0d10] border-t border-neutral-200/70 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            System Architecture
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
            Small extension. <br />
            Big difference.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            Engineered from scratch to blend seamlessly into modern Chromium and Firefox engines with zero overhead.
          </p>
        </div>

        {/* Elegant Numbered Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <div
              key={feature.number}
              className="group relative p-7 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Number & Subtle Vector Accent */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-neutral-900 dark:text-white">
                  {feature.number}
                </span>

                <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <CursorIcon
                    type={cursorAccents[idx] || 'pointer'}
                    size={22}
                    variant="dark"
                    className="dark:hidden"
                  />
                  <CursorIcon
                    type={cursorAccents[idx] || 'pointer'}
                    size={22}
                    variant="light"
                    className="hidden dark:inline-block"
                  />
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Tag Footer */}
              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono font-medium text-neutral-400 dark:text-neutral-500">
                  {feature.tag}
                </span>
                <span className="text-[11px] font-mono text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
