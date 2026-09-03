import React from 'react';
import { StepItem } from '../types';
import { Download, Pin, Compass, Sliders } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps: StepItem[] = [
    {
      number: '01',
      title: 'Install',
      description: 'Install the extension.',
      detail: 'Add to Edge or Firefox in a single click without browser restart.',
    },
    {
      number: '02',
      title: 'Pin',
      description: 'Pin it to your browser toolbar.',
      detail: 'Keep the minimal menu icon handy for one-click site controls.',
    },
    {
      number: '03',
      title: 'Browse',
      description: 'Browse normally — your new cursors activate automatically.',
      detail: 'Vector shapes replace default CSS states instantaneously.',
    },
    {
      number: '04',
      title: 'Customize',
      description: 'Optionally pause on a website or open the Manager.',
      detail: 'Switch between Obsidian and Pure White variants at will.',
    },
  ];

  const stepIcons = [Download, Pin, Compass, Sliders];

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-white dark:bg-[#0c0d10] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Setup Workflow
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Up and running in seconds.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            No registration, no accounts, and no configuration required.
          </p>
        </div>

        {/* 4-Step Timeline (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[1px] bg-neutral-200 dark:bg-neutral-800 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = stepIcons[idx];
              return (
                <div
                  key={step.number}
                  className="group relative p-6 sm:p-7 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Step number and icon badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                        Step {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white shadow-xs group-hover:scale-105 transition-transform">
                        <IconComponent size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-snug">
                      {step.description}
                    </p>
                  </div>

                  <p className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
