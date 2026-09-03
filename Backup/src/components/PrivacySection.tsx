import React from 'react';
import { ShieldCheck, Lock, XCircle, ArrowRight, CheckCircle2, WifiOff } from 'lucide-react';
import { CursorIcon } from './CursorIcon';

export const PrivacySection: React.FC = () => {
  const points = [
    { title: 'No tracking', desc: 'Zero event telemetry or behavioral fingerprinting.' },
    { title: 'No analytics', desc: 'No Google Analytics, Mixpanel, or usage pings.' },
    { title: 'No ads', desc: 'Completely unmonetized and free of promotional code.' },
    { title: 'No external connections', desc: 'Packaged with zero network fetch permissions.' },
  ];

  return (
    <section
      id="privacy"
      className="py-24 sm:py-32 bg-[#FBFBFD] dark:bg-[#0a0b0e] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-4 shadow-xs">
            <Lock size={12} className="text-emerald-500" />
            <span>Zero Remote Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Your browsing stays yours.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Custom Clicks runs locally in your browser. Your browsing activity isn't sent to a remote server.
          </p>
        </div>

        {/* Big Bold Visual Statement & Architecture Diagram */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900/60 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 p-8 sm:p-12 shadow-sm">
          {/* 100% LOCAL Dominant Typographic Statement */}
          <div className="text-center mb-12 sm:mb-14">
            <span className="block text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-900 dark:text-white">
              100%
            </span>
            <span className="block text-xl sm:text-3xl font-extrabold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 -mt-1 sm:-mt-2">
              LOCAL
            </span>
          </div>

          {/* Architecture Diagram: Browser -> Local Extension -> Cursor (No Cloud) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-800/80 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
              {/* Node 1: Browser */}
              <div className="flex-1 w-full flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Input</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                  Browser DOM
                </span>
                <span className="text-xs text-neutral-500 mt-0.5">Active web page</span>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center text-neutral-400 rotate-90 md:rotate-0">
                <ArrowRight size={20} />
              </div>

              {/* Node 2: Local Extension */}
              <div className="flex-1 w-full flex flex-col items-center text-center p-4 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 shadow-md">
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 dark:text-emerald-600 uppercase font-semibold">
                  <WifiOff size={11} />
                  <span>Offline Sandbox</span>
                </div>
                <span className="text-sm font-bold mt-1">
                  Local Extension
                </span>
                <span className="text-xs text-neutral-300 dark:text-neutral-600 mt-0.5">
                  100% In-Memory
                </span>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center text-neutral-400 rotate-90 md:rotate-0">
                <ArrowRight size={20} />
              </div>

              {/* Node 3: Cursor */}
              <div className="flex-1 w-full flex flex-col items-center text-center p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Output</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <CursorIcon type="pointer" size={16} variant="dark" className="dark:hidden" />
                  <CursorIcon type="pointer" size={16} variant="light" className="hidden dark:inline-block" />
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">
                    Vector Cursor
                  </span>
                </div>
                <span className="text-xs text-neutral-500 mt-0.5">Client-side render</span>
              </div>
            </div>

            {/* Blocked Remote Cloud Indicator */}
            <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center gap-2 text-xs text-rose-500 dark:text-rose-400 font-mono font-medium">
              <XCircle size={15} />
              <span>Remote Cloud Servers / Tracking APIs: NONE (Strictly Forbidden)</span>
            </div>
          </div>

          {/* 4 Supporting Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {points.map((point) => (
              <div
                key={point.title}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50/70 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60"
              >
                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {point.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
