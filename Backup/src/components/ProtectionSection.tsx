import React, { useState } from 'react';
import { CursorIcon } from './CursorIcon';
import { Shield, EyeOff, Sparkles, Sliders, CheckCircle2, Play, CircleDot } from 'lucide-react';

export const ProtectionSection: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'standard' | 'none' | 'custom'>('none');
  const [customPointerPos, setCustomPointerPos] = useState({ x: 160, y: 120 });

  return (
    <section
      id="protection"
      className="py-24 sm:py-32 bg-[#08090C] text-white border-t border-neutral-800/80 transition-colors relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neutral-800/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-4 shadow-xs">
            <Shield size={12} className="text-emerald-400" />
            <span>Smart Web Protection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Designed to know when to stay out of the way.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Custom Clicks evaluates CSS properties and DOM context in real time. Games, fullscreen video players, and bespoke website design cursors are never corrupted.
          </p>
        </div>

        {/* Protection Scenarios Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Scenario Selector & Principles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Scenario 1: Respects cursor:none */}
            <div
              onClick={() => setActiveScenario('none')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeScenario === 'none'
                  ? 'bg-neutral-900/90 border-white/40 shadow-lg ring-1 ring-white/20'
                  : 'bg-neutral-900/30 border-neutral-800/70 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  cursor: none
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Auto-Bypass
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Fullscreen Video & 3D WebGL
              </h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                When a web app requests cursor suppression (e.g. YouTube theater mode, Unreal WebGL engine, or game canvas), Custom Clicks vanishes completely.
              </p>
            </div>

            {/* Scenario 2: Preserves Custom Website Cursors */}
            <div
              onClick={() => setActiveScenario('custom')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeScenario === 'custom'
                  ? 'bg-neutral-900/90 border-white/40 shadow-lg ring-1 ring-white/20'
                  : 'bg-neutral-900/30 border-neutral-800/70 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-blue-400">
                  cursor: url(...)
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Preserved
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Bespoke Website Cursors
              </h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Design portfolios and interactive agencies featuring custom magnetic rings or canvas brushes remain 100% untouched.
              </p>
            </div>

            {/* Scenario 3: Standard Web Enhancement */}
            <div
              onClick={() => setActiveScenario('standard')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeScenario === 'standard'
                  ? 'bg-neutral-900/90 border-white/40 shadow-lg ring-1 ring-white/20'
                  : 'bg-neutral-900/30 border-neutral-800/70 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-neutral-300">
                  cursor: pointer / text
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Enhanced
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Standard Web Pages
              </h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Browsing articles, documentation, social feeds, and web dashboards automatically uses your selected WhiteSur vector cursor pack.
              </p>
            </div>
          </div>

          {/* Right Column: Live Mockup Showing the Smart Rule in Action */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-4 sm:p-6 shadow-2xl">
              {/* Mockup Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-neutral-400">
                    protection-inspector.ts
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <CheckCircle2 size={12} />
                  <span>PASS: Non-destructive</span>
                </div>
              </div>

              {/* Dynamic Viewport Demonstration */}
              <div
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setCustomPointerPos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                className="relative mt-4 h-72 sm:h-80 rounded-2xl bg-neutral-950 border border-neutral-800/80 p-6 flex flex-col justify-between overflow-hidden select-none"
                style={{
                  cursor:
                    activeScenario === 'none'
                      ? 'none'
                      : activeScenario === 'custom'
                      ? 'none' // Custom ring simulated
                      : 'default',
                }}
              >
                {/* Scenario Visuals */}
                {activeScenario === 'none' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-neutral-300 mb-3 shadow-inner">
                      <EyeOff size={22} className="text-emerald-400" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                      cursor: none Active
                    </span>
                    <h5 className="text-lg font-bold text-white mt-1">
                      Fullscreen Game Canvas Running
                    </h5>
                    <p className="text-xs text-neutral-400 max-w-sm mt-1">
                      Notice that no pointer is rendered in this area. Custom Clicks honors the application suppression directive.
                    </p>
                  </div>
                )}

                {activeScenario === 'custom' && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center relative">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-3">
                      <Sparkles size={20} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                      Author Defined Cursor
                    </span>
                    <h5 className="text-lg font-bold text-white mt-1">
                      Creative Studio Custom Magnetic Ring
                    </h5>
                    <p className="text-xs text-neutral-400 max-w-sm mt-1">
                      The website author's custom circle cursor is preserved identically without collision.
                    </p>

                    {/* Simulated website author custom ring cursor following mouse */}
                    <div
                      className="pointer-events-none absolute transition-transform duration-75 ease-out"
                      style={{
                        transform: `translate3d(${customPointerPos.x - 16}px, ${
                          customPointerPos.y - 16
                        }px, 0)`,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-400/20 backdrop-blur-xs flex items-center justify-center shadow-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                )}

                {activeScenario === 'standard' && (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase">
                        Standard Web Layout
                      </span>
                      <h5 className="text-lg font-bold text-white mt-1">
                        High-Fidelity WhiteSur Cursors Active
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-auto">
                      <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center gap-3">
                        <CursorIcon type="pointer" size={24} variant="light" />
                        <div>
                          <span className="text-xs font-semibold text-neutral-200">Button Click</span>
                          <p className="text-[10px] text-neutral-500 font-mono">cursor: pointer</p>
                        </div>
                      </div>
                      <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center gap-3">
                        <CursorIcon type="text" size={24} variant="light" />
                        <div>
                          <span className="text-xs font-semibold text-neutral-200">Text Reading</span>
                          <p className="text-[10px] text-neutral-500 font-mono">cursor: text</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Real-time Engine Metric */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-[11px] font-mono text-neutral-500">
                  <span>DOM Mutation Latency: &lt;0.2ms</span>
                  <span className="text-neutral-300">Smart Guard: Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
