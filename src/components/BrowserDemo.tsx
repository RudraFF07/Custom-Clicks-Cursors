import React, { useState, useEffect, useRef } from 'react';
import { CursorIcon } from './CursorIcon';
import {
  Sparkles,
  Lock,
  RotateCw,
  Sliders,
  Move,
  Maximize2,
  CheckCircle2,
  Play,
  Pause,
  HelpCircle,
  Ban,
  Palette,
  Eye,
} from 'lucide-react';

interface InteractiveZone {
  id: string;
  label: string;
  cursorType: string;
  cssProperty: string;
  description: string;
  x: number;
  y: number;
}

export const BrowserDemo: React.FC = () => {
  // Manual override or auto-detect mode
  const [lockedCursor, setLockedCursor] = useState<string | null>(null);
  const [activeCursor, setActiveCursor] = useState<string>('default');
  const [activeElementInfo, setActiveElementInfo] = useState<{
    name: string;
    state: string;
    css: string;
  }>({
    name: 'Standard Surface',
    state: 'Arrow',
    css: 'cursor: default',
  });

  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [virtualPointerPos, setVirtualPointerPos] = useState({ x: 220, y: 150 });
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);
  const [textInputValue, setTextInputValue] = useState<string>(
    'Refined typography with sub-pixel WhiteSur alignment...'
  );
  const [isLoadingActive, setIsLoadingActive] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<number>(0);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [resizeWidth, setResizeWidth] = useState<number>(240);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, show: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef<boolean>(false);

  // Scripted waypoints for auto-tour demo
  const waypoints: InteractiveZone[] = [
    {
      id: 'button-cta',
      label: 'Primary CTA Button',
      cursorType: 'pointer',
      cssProperty: 'cursor: pointer',
      description: 'Hand pointer with rounded fingers & high-contrast outline',
      x: 140,
      y: 130,
    },
    {
      id: 'text-area',
      label: 'Editorial Copy',
      cursorType: 'text',
      cssProperty: 'cursor: text',
      description: 'Precision serifed I-beam stem for typographic accuracy',
      x: 340,
      y: 195,
    },
    {
      id: 'draggable-card',
      label: 'Kanban Card',
      cursorType: 'grab',
      cssProperty: 'cursor: grab',
      description: 'Open palm indicating repositionable canvas elements',
      x: 180,
      y: 290,
    },
    {
      id: 'resize-handle',
      label: 'Split Boundary',
      cursorType: 'ew-resize',
      cssProperty: 'cursor: ew-resize',
      description: 'Dual-headed lateral arrow for panel adjustments',
      x: 380,
      y: 290,
    },
    {
      id: 'loading-trigger',
      label: 'Async Fetch',
      cursorType: 'wait-spinner',
      cssProperty: 'cursor: wait',
      description: 'WhiteSur 8-segment rotating activity wheel',
      x: 520,
      y: 290,
    },
    {
      id: 'zoom-preview',
      label: 'Asset View',
      cursorType: 'zoom-in',
      cssProperty: 'cursor: zoom-in',
      description: 'Magnifier lens with centered optical vector mark',
      x: 230,
      y: 380,
    },
  ];

  // Auto-tour animation loop when user is not manually interacting
  useEffect(() => {
    if (!isAutoPlaying || isUserHovering) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % waypoints.length;
      const target = waypoints[step];
      setVirtualPointerPos({ x: target.x, y: target.y });
      if (!lockedCursor) {
        setActiveCursor(target.cursorType);
        setActiveElementInfo({
          name: target.label,
          state: target.cursorType,
          css: target.cssProperty,
        });
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isUserHovering, lockedCursor, waypoints]);

  // Handle mouse move across sandbox
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsUserHovering(true);

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setVirtualPointerPos({ x, y });

    // If dragging the Kanban card
    if (isMouseDownRef.current && isDragging) {
      const delta = x - dragStartX;
      setDragX(Math.max(-40, Math.min(40, delta)));
    }
  };

  const handleContainerMouseEnter = () => {
    setIsUserHovering(true);
  };

  const handleContainerMouseLeave = () => {
    setIsUserHovering(false);
    setIsDragging(false);
    isMouseDownRef.current = false;
    if (!lockedCursor) {
      setActiveCursor('default');
      setActiveElementInfo({
        name: 'Standard Surface',
        state: 'Arrow',
        css: 'cursor: default',
      });
    }
  };

  const handleZoneEnter = (
    cursorType: string,
    name: string,
    css: string
  ) => {
    if (lockedCursor) return; // Respect manual lock
    setActiveCursor(cursorType);
    setActiveElementInfo({ name, state: cursorType, css });
  };

  const handleZoneLeave = () => {
    if (lockedCursor) return;
    if (isDragging) {
      setActiveCursor('grabbing');
      return;
    }
    setActiveCursor('default');
    setActiveElementInfo({
      name: 'Standard Surface',
      state: 'default',
      css: 'cursor: default',
    });
  };

  // Click handler on canvas for ripple effect
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickRipple({ x, y, id: Date.now() });
  };

  const triggerAsyncAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoadingActive(true);
    if (!lockedCursor) {
      setActiveCursor('wait-spinner');
      setActiveElementInfo({
        name: 'Async Background Job',
        state: 'wait',
        css: 'cursor: wait',
      });
    }
    setTimeout(() => {
      setIsLoadingActive(false);
      if (!lockedCursor) {
        setActiveCursor('pointer');
        setActiveElementInfo({
          name: 'Action Button',
          state: 'pointer',
          css: 'cursor: pointer',
        });
      }
    }, 2000);
  };

  // Quick cursor selector options
  const cursorPills = [
    { id: 'auto', label: '✨ Smart Auto', cursor: null },
    { id: 'default', label: 'Arrow', cursor: 'default', css: 'cursor: default' },
    { id: 'pointer', label: 'Pointer', cursor: 'pointer', css: 'cursor: pointer' },
    { id: 'text', label: 'I-Beam', cursor: 'text', css: 'cursor: text' },
    { id: 'grab', label: 'Grab', cursor: 'grab', css: 'cursor: grab' },
    { id: 'grabbing', label: 'Grabbing', cursor: 'grabbing', css: 'cursor: grabbing' },
    { id: 'wait-spinner', label: 'Wait Spinner', cursor: 'wait-spinner', css: 'cursor: wait' },
    { id: 'ew-resize', label: 'Resize', cursor: 'ew-resize', css: 'cursor: ew-resize' },
    { id: 'crosshair', label: 'Crosshair', cursor: 'crosshair', css: 'cursor: crosshair' },
    { id: 'zoom-in', label: 'Zoom In', cursor: 'zoom-in', css: 'cursor: zoom-in' },
    { id: 'help', label: 'Help', cursor: 'help', css: 'cursor: help' },
    { id: 'not-allowed', label: 'Blocked', cursor: 'not-allowed', css: 'cursor: not-allowed' },
  ];

  // Hotspot offsets based on cursor geometry
  const getHotspotOffset = (type: string) => {
    switch (type) {
      case 'default':
        return { x: 0, y: 0 };
      case 'pointer':
      case 'pointer-hand':
        return { x: -6, y: -2 };
      case 'text':
      case 'text-ibeam':
        return { x: -14, y: -16 };
      case 'crosshair':
        return { x: -16, y: -16 };
      case 'grab':
      case 'grabbing':
        return { x: -14, y: -14 };
      case 'ew-resize':
      case 'col-resize':
      case 'ns-resize':
      case 'row-resize':
      case 'all-scroll':
      case 'move':
        return { x: -16, y: -16 };
      case 'wait':
      case 'wait-spinner':
        return { x: -16, y: -16 };
      case 'zoom-in':
      case 'zoom-out':
        return { x: -8, y: -8 };
      case 'help':
        return { x: -2, y: -2 };
      default:
        return { x: -4, y: -4 };
    }
  };

  const hotspot = getHotspotOffset(activeCursor);

  return (
    <div id="hero-demo" className="w-full max-w-5xl mx-auto">
      {/* Quick Test Toolbar */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
          <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mr-1 hidden sm:inline whitespace-nowrap">
            Cursor Mode:
          </span>
          {cursorPills.map((pill) => {
            const isSelected = pill.cursor === null ? lockedCursor === null : lockedCursor === pill.cursor;
            return (
              <button
                key={pill.id}
                onClick={() => {
                  if (pill.cursor === null) {
                    setLockedCursor(null);
                    setActiveCursor('default');
                    setActiveElementInfo({
                      name: 'Smart Auto Detection',
                      state: 'Auto',
                      css: 'cursor: auto',
                    });
                  } else {
                    setLockedCursor(pill.cursor);
                    setActiveCursor(pill.cursor);
                    setActiveElementInfo({
                      name: `${pill.label} Locked`,
                      state: pill.cursor,
                      css: pill.css || `cursor: ${pill.cursor}`,
                    });
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs scale-102 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors text-xs font-medium"
            title={isAutoPlaying ? 'Pause automatic cursor tour' : 'Play automatic cursor tour'}
          >
            {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
          </button>
        </div>
      </div>

      {/* Browser Window Frame */}
      <div className="relative bg-neutral-900 rounded-2xl p-1.5 sm:p-2 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.35)] border border-neutral-700/70 dark:border-neutral-700 transition-all duration-300">
        {/* macOS Browser Chrome Header */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-neutral-900 rounded-t-xl border-b border-neutral-800 text-xs select-none">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 shadow-inner" />
          </div>

          {/* URL Pill */}
          <div className="flex-1 max-w-md mx-3 flex items-center justify-center">
            <div className="w-full flex items-center justify-between gap-2 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-750 rounded-lg border border-neutral-700/60 text-neutral-300 text-[11px] font-mono shadow-inner transition-colors">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Lock size={10} className="text-emerald-400" />
                <span className="text-neutral-200">https://</span>
                <span className="text-neutral-100 font-medium">customclicks.local</span>
                <span className="text-neutral-400">/interactive-sandbox</span>
              </div>
              <RotateCw size={11} className="text-neutral-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Extension Active Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-800 rounded-lg border border-neutral-700 text-[11px] text-neutral-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhiteSur Active</span>
            </div>
          </div>
        </div>

        {/* Browser Viewport Canvas (Interactive Webpage) */}
        <div
          ref={containerRef}
          onMouseMove={handleContainerMouseMove}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          onClick={handleCanvasClick}
          className="sandbox-canvas relative bg-[#FAFAFA] dark:bg-[#121316] text-neutral-900 dark:text-neutral-100 rounded-b-xl min-h-[420px] sm:min-h-[460px] p-4 sm:p-6 overflow-hidden select-none border-t border-neutral-200 dark:border-neutral-800/60"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Interactive Web Page Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-5">
            {/* Header in page */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    Live Testing Sandbox
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                  Move your mouse anywhere to test cursors
                </h4>
              </div>

              {/* Action Buttons with pointer cursor */}
              <div className="flex items-center gap-2">
                <button
                  onMouseEnter={() =>
                    handleZoneEnter('pointer', 'Primary Action Button', 'cursor: pointer')
                  }
                  onMouseLeave={handleZoneLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Clicked button with WhiteSur pointer!');
                  }}
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-semibold shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <span>Action Button</span>
                </button>
                <a
                  href="#explore"
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={() =>
                    handleZoneEnter('pointer', 'Hyperlink', 'cursor: pointer')
                  }
                  onMouseLeave={handleZoneLeave}
                  className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 px-2 py-1 rounded"
                >
                  Hyperlink &rarr;
                </a>
              </div>
            </div>

            {/* Editable & Selectable Text Area (text I-beam) */}
            <div
              onMouseEnter={() =>
                handleZoneEnter('text', 'Typographic Input & Selection', 'cursor: text')
              }
              onMouseLeave={handleZoneLeave}
              className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/90 dark:border-neutral-800 shadow-xs transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  Text Field (I-Beam Target)
                </span>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  cursor: text
                </span>
              </div>
              <input
                type="text"
                value={textInputValue}
                onChange={(e) => setTextInputValue(e.target.value)}
                onFocus={() => handleZoneEnter('text', 'Focused Input Field', 'cursor: text')}
                className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none font-sans"
                placeholder="Click and type here..."
              />
            </div>

            {/* 3-Column Interactive Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Draggable Kanban Card (grab / grabbing) */}
              <div
                onMouseEnter={() =>
                  handleZoneEnter(isDragging ? 'grabbing' : 'grab', 'Kanban Draggable Card', 'cursor: grab / grabbing')
                }
                onMouseLeave={handleZoneLeave}
                onMouseDown={(e) => {
                  isMouseDownRef.current = true;
                  setIsDragging(true);
                  setDragStartX(virtualPointerPos.x);
                  handleZoneEnter('grabbing', 'Card Drag In Progress', 'cursor: grabbing');
                }}
                onMouseUp={() => {
                  isMouseDownRef.current = false;
                  setIsDragging(false);
                  setDragX(0);
                  handleZoneEnter('grab', 'Kanban Draggable Card', 'cursor: grab');
                }}
                style={{ transform: `translateX(${dragX}px)` }}
                className={`p-4 rounded-2xl bg-white dark:bg-neutral-900 border select-none transition-all ${
                  isDragging
                    ? 'border-neutral-500 dark:border-neutral-500 shadow-lg scale-102 ring-2 ring-neutral-400/30'
                    : 'border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-[10px] font-mono uppercase font-semibold">Hold & Drag</span>
                  <Move size={14} />
                </div>
                <p className="text-xs font-bold text-neutral-900 dark:text-white">
                  Sprint Milestone #4
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Click and drag to test smooth transition between open palm and clenched fist.
                </p>
              </div>

              {/* Split Width Slider (ew-resize) */}
              <div
                onMouseEnter={() =>
                  handleZoneEnter('ew-resize', 'Panel Boundary Slider', 'cursor: ew-resize')
                }
                onMouseLeave={handleZoneLeave}
                onClick={() => {
                  setResizeWidth((prev) => (prev >= 280 ? 160 : prev + 40));
                }}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-[10px] font-mono uppercase font-semibold">Resize Pane</span>
                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    {resizeWidth}px
                  </span>
                </div>
                <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden my-2">
                  <div
                    className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-200"
                    style={{ width: `${(resizeWidth / 300) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mt-2">
                  <span>Click to adjust</span>
                  <Sliders size={12} />
                </div>
              </div>

              {/* Async Task & Blocked Trigger (wait-spinner & not-allowed) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-semibold">System Triggers</span>
                    <button
                      onMouseEnter={() =>
                        handleZoneEnter('help', 'Contextual Help', 'cursor: help')
                      }
                      onMouseLeave={handleZoneLeave}
                      className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded"
                    >
                      <HelpCircle size={13} />
                    </button>
                  </div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">
                    State Switches
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                  <button
                    onClick={triggerAsyncAction}
                    onMouseEnter={() =>
                      handleZoneEnter(
                        isLoadingActive ? 'wait-spinner' : 'pointer',
                        'Async Task Runner',
                        isLoadingActive ? 'cursor: wait' : 'cursor: pointer'
                      )
                    }
                    onMouseLeave={handleZoneLeave}
                    className="flex-1 py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-xl text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    {isLoadingActive ? 'Running...' : 'Run Async'}
                  </button>
                  <button
                    onMouseEnter={() =>
                      handleZoneEnter('not-allowed', 'Restricted Permission', 'cursor: not-allowed')
                    }
                    onMouseLeave={handleZoneLeave}
                    className="py-1.5 px-2.5 bg-neutral-100/70 dark:bg-neutral-800/40 text-[11px] font-medium text-neutral-400 rounded-xl opacity-75 flex items-center gap-1"
                  >
                    <Ban size={11} />
                    <span>Locked</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Zoom In Lens & Crosshair Canvas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Zoom In Lens Area */}
              <div
                onMouseEnter={() =>
                  handleZoneEnter('zoom-in', 'Zoom Lens Magnifier', 'cursor: zoom-in')
                }
                onMouseLeave={handleZoneLeave}
                className="p-3.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 shadow-xs">
                    <Maximize2 size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      High-Resolution Inspector
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Hover to trigger optical vector zoom-in lens
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700">
                  3.2x
                </span>
              </div>

              {/* Crosshair Precision Grid */}
              <div
                onMouseEnter={() =>
                  handleZoneEnter('crosshair', 'Precision Drafting Reticle', 'cursor: crosshair')
                }
                onMouseLeave={handleZoneLeave}
                className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-500 font-mono text-sm">
                    +
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      Canvas Precision Reticle
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Sub-pixel alignment for graphics and charts
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                  X:{Math.round(virtualPointerPos.x)} Y:{Math.round(virtualPointerPos.y)}
                </span>
              </div>
            </div>
          </div>

          {/* Click Ripple Effect */}
          {clickRipple && (
            <div
              key={clickRipple.id}
              className="pointer-events-none absolute w-8 h-8 rounded-full border border-neutral-900/40 dark:border-white/40 -translate-x-1/2 -translate-y-1/2 animate-ping duration-300"
              style={{
                left: clickRipple.x,
                top: clickRipple.y,
              }}
            />
          )}

          {/* 60fps Real-time Virtual Cursor Rendering */}
          <div
            className="pointer-events-none absolute top-0 left-0 z-40 will-change-transform"
            style={{
              top: 0,
              left: 0,
              transform: `translate3d(${virtualPointerPos.x + hotspot.x}px, ${virtualPointerPos.y + hotspot.y}px, 0)`,
              transition: isUserHovering ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            <div className="relative">
              {/* Cursor Icon Rendering with high-contrast shadow */}
              <div className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                <CursorIcon
                  type={activeCursor}
                  size={36}
                />
              </div>

              {/* Floating Tooltip Pill next to cursor */}
              <div className="absolute left-7 top-4 whitespace-nowrap bg-neutral-900/95 text-white dark:bg-white/95 dark:text-neutral-950 text-[10px] font-mono px-2 py-0.5 rounded-md shadow-lg backdrop-blur-xs border border-white/20 dark:border-black/10 flex items-center gap-1.5 opacity-90 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="font-semibold">{activeElementInfo.css}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Diagnostics Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2.5 bg-neutral-950 text-neutral-400 text-xs rounded-b-xl border-t border-neutral-800 gap-2 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-500 font-medium">State:</span>
            <span className="text-neutral-200 font-semibold">{activeElementInfo.name}</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 font-mono text-[11px]">{activeElementInfo.css}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 size={13} />
              <span>Zero-lag vector</span>
            </span>
            <span className="text-neutral-700">|</span>
            <span className="text-neutral-400">93 WhiteSur SVGs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
