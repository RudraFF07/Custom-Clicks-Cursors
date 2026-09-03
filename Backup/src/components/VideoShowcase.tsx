import React, { useState } from 'react';
import { CursorIcon } from './CursorIcon';
import { APP_CONFIG } from '../config';
import { Play, Sparkles, Move, Maximize2, RotateCw } from 'lucide-react';

export const VideoShowcase: React.FC = () => {
  const [activeCursorHighlight, setActiveCursorHighlight] = useState<string>('pointer');

  const floatingBadges = [
    { label: 'Pointer', cursor: 'pointer', x: '10%', y: '18%', desc: 'Clickable target' },
    { label: 'I-Beam', cursor: 'text', x: '82%', y: '22%', desc: 'Editable copy' },
    { label: 'Drag', cursor: 'grab', x: '14%', y: '75%', desc: 'Movable node' },
    { label: 'Resize', cursor: 'ew-resize', x: '80%', y: '78%', desc: 'Split boundary' },
    { label: 'Zoom', cursor: 'zoom-in', x: '50%', y: '12%', desc: 'Retina preview' },
    { label: 'Loading', cursor: 'wait-spinner', x: '50%', y: '84%', desc: 'Async worker' },
  ];

  return (
    <section
      id="video-showcase"
      className="py-24 sm:py-32 bg-neutral-950 text-white relative overflow-hidden transition-colors"
    >
      {/* Subtle radial center ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-800/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
            Precision Across Web Standards
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Made for every interaction.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-normal">
            Whether selecting a single glyph or scaling responsive grid columns, experience a cursor tailored to the action.
          </p>
        </div>

        {/* Large Cinematic Demonstration Stage with Floating Cursor Badges */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-neutral-900 border border-neutral-800 p-4 sm:p-8 shadow-2xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Floating Interactive Cursor Badges */}
          {floatingBadges.map((badge) => (
            <div
              key={badge.label}
              onMouseEnter={() => setActiveCursorHighlight(badge.cursor)}
              className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white/40 cursor-pointer z-20 group"
              style={{ top: badge.y, left: badge.x, transform: 'translate(-50%, -50%)' }}
            >
              <CursorIcon type={badge.cursor} size={18} variant="light" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {badge.label}
                </span>
              </div>
            </div>
          ))}

          {/* Center Cinematic Feature Card */}
          <div className="relative z-10 max-w-lg text-center p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-800 backdrop-blur-xl shadow-2xl">
            {/* Active Display Cursor */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center shadow-inner mb-5">
              <CursorIcon
                type={activeCursorHighlight}
                size={44}
                variant="light"
              />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
              Active Focus: {activeCursorHighlight}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 tracking-tight">
              WhiteSur High-DPI Vector
            </h3>

            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-sans">
              Rendered as optimized vector geometry. Zero pixelation on 4K/5K displays, high-refresh rates up to 240Hz, and native optical contrast.
            </p>

            {/* Mobile Tag Strip */}
            <div className="mt-5 flex sm:hidden flex-wrap items-center justify-center gap-1.5">
              {floatingBadges.map((badge) => (
                <button
                  key={badge.label}
                  onClick={() => setActiveCursorHighlight(badge.cursor)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors ${
                    activeCursorHighlight === badge.cursor
                      ? 'bg-white text-neutral-950 font-bold'
                      : 'bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
