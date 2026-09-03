import React, { useState } from 'react';
import { CURSOR_COLLECTION, CURSOR_CATEGORIES } from '../data/cursors';
import { CursorIcon } from './CursorIcon';
import { CursorCategory, CursorItem } from '../types';
import { Sliders, Copy, Check, MousePointer, Info, Crosshair } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const CursorGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CursorCategory>('all');
  const [activeTestCursor, setActiveTestCursor] = useState<CursorItem>(CURSOR_COLLECTION[0]);
  const [cursorSize, setCursorSize] = useState<number>(32);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testPadClicks, setTestPadClicks] = useState<number>(0);

  const filteredCursors =
    selectedCategory === 'all'
      ? CURSOR_COLLECTION
      : CURSOR_COLLECTION.filter((c) => c.category === selectedCategory);

  const getCursorCss = (cursor: CursorItem) => {
    const map: Record<string, string> = {
      default: 'default.svg',
      pointer: 'pointer.svg',
      'pointer-hand': 'pointer.svg',
      text: 'text.svg',
      'text-ibeam': 'text.svg',
      'vertical-text': 'vertical-text.svg',
      grab: 'openhand.svg',
      'grab-open': 'openhand.svg',
      grabbing: 'openhand.svg',
      move: 'dnd-move.svg',
      'move-all': 'all-scroll.svg',
      'all-scroll': 'all-scroll.svg',
      'resize-ew': 'col-resize.svg',
      'resize-ns': 'row-resize.svg',
      'resize-nwse': 'size_fdiag.svg',
      'resize-nesw': 'size_bdiag.svg',
      'zoom-in': 'zoom-in.svg',
      'zoom-out': 'zoom-out.svg',
      crosshair: 'crosshair.svg',
      cell: 'cell.svg',
      wait: 'wait.svg',
      'wait-spinner': 'wait.svg',
      progress: 'progress.svg',
      help: 'help.svg',
      'not-allowed': 'not-allowed.svg',
      'no-drop': 'no-drop.svg',
      copy: 'copy.svg',
      alias: 'alias.svg',
      'context-menu': 'context-menu.svg',
      'color-picker': 'color-picker.svg',
      pencil: 'pencil.svg',
      draft: 'draft.svg',
      'up-arrow': 'up-arrow.svg',
      'down-arrow': 'down-arrow.svg',
      'left-arrow': 'left-arrow.svg',
      'right-arrow': 'right-arrow.svg',
    };
    const file = map[cursor.svgPath] || (cursor.svgPath.endsWith('.svg') ? cursor.svgPath : `${cursor.svgPath}.svg`);
    return `url('${getAssetUrl(`cursors/${file}`)}') ${cursor.hotspot[0]} ${cursor.hotspot[1]}, ${cursor.cssState}`;
  };

  const copyCssSnippet = (cursor: CursorItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const snippet = `cursor: ${cursor.cssState}; /* Custom Clicks WhiteSur Replacement */`;
    navigator.clipboard?.writeText(snippet);
    setCopiedId(cursor.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <section
      id="showcase"
      className="py-20 sm:py-28 bg-[#FBFBFD] dark:bg-[#0c0d10] border-t border-neutral-200/70 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-4 shadow-xs">
            <MousePointer size={12} className="text-neutral-500" />
            <span>Vector Library</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            90+ ways to point.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            Every interaction deserves the right cursor. Handcrafted for maximum visual clarity, zero flicker, and optical alignment.
          </p>

          {/* Interactive Controls Bar: Category Filter & View Preferences */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-neutral-900/90 p-2 sm:p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {CURSOR_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as CursorCategory)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Preferences: Size & Dark/Light variant */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-2 md:pt-0 border-neutral-100 dark:border-neutral-800">
              {/* Size selector */}
              <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="text-[11px] mr-1 hidden sm:inline">Scale:</span>
                {[24, 32, 44].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setCursorSize(sz)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                      cursorSize === sz
                        ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/40 text-neutral-500'
                    }`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>

              {/* Theme toggle */}
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setPreviewTheme('dark')}
                  className={`px-2 py-1 rounded text-[11px] transition-all ${
                    previewTheme === 'dark'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Obsidian
                </button>
                <button
                  onClick={() => setPreviewTheme('light')}
                  className={`px-2 py-1 rounded text-[11px] transition-all ${
                    previewTheme === 'light'
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Pure White
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cursors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredCursors.map((cursor) => {
            const isSelected = activeTestCursor.id === cursor.id;
            return (
              <div
                key={cursor.id}
                onClick={() => setActiveTestCursor(cursor)}
                style={{ cursor: getCursorCss(cursor) }}
                className={`group relative p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-md ring-1 ring-neutral-900 dark:ring-white scale-[1.02]'
                    : 'bg-white dark:bg-neutral-900/60 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow'
                }`}
              >
                {/* Hotspot & Category Pill */}
                <div className="w-full flex items-center justify-between text-[10px] text-neutral-400 font-mono mb-3 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="capitalize">{cursor.category.split('-')[0]}</span>
                  <span>
                    ({cursor.hotspot[0]},{cursor.hotspot[1]})
                  </span>
                </div>

                {/* Cursor Preview Area */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-center my-1 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 transition-colors">
                  <div className="transition-transform duration-200 group-hover:scale-115">
                    <CursorIcon
                      type={cursor.svgPath}
                      size={cursorSize}
                      variant={previewTheme}
                      showHotspot={isSelected}
                    />
                  </div>
                </div>

                {/* Name & CSS State */}
                <div className="mt-3 w-full">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {cursor.name}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                    {cursor.cssState}
                  </p>
                </div>

                {/* Subtle Hover Action Bar */}
                <div className="mt-2 w-full pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 opacity-80 group-hover:opacity-100">
                  <span className="group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                    Click to test
                  </span>
                  <button
                    onClick={(e) => copyCssSnippet(cursor, e)}
                    className="p-1 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    title="Copy CSS snippet"
                  >
                    {copiedId === cursor.id ? (
                      <Check size={11} className="text-emerald-500" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Scratchpad / Test Playground */}
        <div className="mt-12 p-6 rounded-3xl bg-neutral-900 dark:bg-[#07080a] text-white border border-neutral-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Crosshair size={13} />
                <span>INTERACTIVE TEST CANVAS</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white">
                Active Selection: {activeTestCursor.name}
              </h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-xl">
                {activeTestCursor.description} Hover over the test field to feel the cursor alignment, optical weighting, and zero-flicker responsiveness.
              </p>
            </div>

            {/* Test Pad Target Box */}
            <div
              onClick={() => setTestPadClicks((c) => c + 1)}
              className="w-full lg:w-80 h-32 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex flex-col items-center justify-center p-4 select-none transition-colors hover:border-neutral-500 group relative overflow-hidden"
              style={{ cursor: getCursorCss(activeTestCursor) }}
            >
              <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                <span>Clicks: {testPadClicks}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-700/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CursorIcon
                  type={activeTestCursor.svgPath}
                  size={26}
                  variant="light"
                />
              </div>
              <span className="text-xs font-semibold text-neutral-200">
                Hover or Click in this box
              </span>
              <span className="text-[10px] font-mono text-neutral-400 mt-0.5">
                cursor: {activeTestCursor.cssState}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
