import React, { useState, useEffect, useRef } from 'react';
import { CursorIcon } from './CursorIcon';
import { APP_CONFIG } from '../config';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface StageScene {
  title: string;
  cursor: string;
  css: string;
  durationMs: number;
  highlightText: string;
}

export const InteractiveMotionDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasRealVideo, setHasRealVideo] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scenes: StageScene[] = [
    {
      title: 'Hovering Buttons & Navigation',
      cursor: 'pointer',
      css: 'cursor: pointer',
      durationMs: 3000,
      highlightText: 'Sleek index finger curve with zero layout jump',
    },
    {
      title: 'Selecting Editorial Typography',
      cursor: 'text',
      css: 'cursor: text',
      durationMs: 3000,
      highlightText: 'Optical I-Beam stem designed for sub-pixel character boundaries',
    },
    {
      title: 'Dragging Canvas Elements',
      cursor: 'grabbing',
      css: 'cursor: grabbing',
      durationMs: 3000,
      highlightText: 'Dynamic transition from open palm to clenched fist',
    },
    {
      title: 'Resizing Layout Panes',
      cursor: 'ew-resize',
      css: 'cursor: ew-resize',
      durationMs: 3000,
      highlightText: 'Instant dual-arrow feedback with crisp pixel borders',
    },
    {
      title: 'Asynchronous Background Jobs',
      cursor: 'wait-spinner',
      css: 'cursor: wait',
      durationMs: 3000,
      highlightText: 'Segmented 8-blade wheel with GPU hardware rotation',
    },
    {
      title: 'Deep Zoom Inspection',
      cursor: 'zoom-in',
      css: 'cursor: zoom-in',
      durationMs: 3000,
      highlightText: 'Optical magnifier with centered vector reticle',
    },
  ];

  const totalDuration = scenes.reduce((acc, s) => acc + s.durationMs, 0);

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (intervalTime * playbackSpeed) / totalDuration;
        const next = prev + increment;
        if (next >= 1) {
          return 0;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalDuration]);

  // Sync scene index with progress
  useEffect(() => {
    const elapsedMs = progress * totalDuration;
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      accumulated += scenes[i].durationMs;
      if (elapsedMs <= accumulated) {
        setCurrentSceneIndex(i);
        break;
      }
    }
  }, [progress, totalDuration]);

  const activeScene = scenes[currentSceneIndex] || scenes[0];
  const currentTimeSec = Math.floor((progress * totalDuration) / 1000);
  const totalTimeSec = Math.floor(totalDuration / 1000);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <section
      id="motion-demo"
      className="py-20 sm:py-28 bg-white dark:bg-[#090a0d] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles size={12} />
            <span>Interactive Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            See it in motion.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            Observe the fluid vector transition across every standard CSS web state. Zero flicker. Instantaneous response.
          </p>
        </div>

        {/* Video Frame / Cinematic Showcase Container */}
        <div
          ref={containerRef}
          className={`relative max-w-5xl mx-auto rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none max-w-none border-none' : ''
          }`}
        >
          {/* Real video tag fallback wrapper (Checks /videos/cursor-demo.mp4) */}
          <div className="relative w-full aspect-video min-h-[360px] sm:min-h-[460px] bg-neutral-950 flex flex-col justify-between overflow-hidden">
            {/* If user uploads actual video files, this renders gracefully */}
            <video
              ref={videoRef}
              src={APP_CONFIG.videoAssets.heroDemo}
              className={`absolute inset-0 w-full h-full object-cover ${hasRealVideo ? 'block' : 'hidden'}`}
              onCanPlay={() => setHasRealVideo(true)}
              onError={() => setHasRealVideo(false)}
              muted={isMuted}
              loop
              playsInline
            />

            {/* Poster / High-Definition Simulated Video Demonstration */}
            <div className="relative flex-1 p-6 sm:p-10 flex flex-col justify-between z-10">
              {/* Top Video Status & Timestamp Overlay */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/90">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DEMO SCENE: {activeScene.title}</span>
                </div>

                <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-mono text-white/70">
                  <span>{activeScene.css}</span>
                </div>
              </div>

              {/* Center Cinematic Stage: Demonstrating the Active Scene Vector */}
              <div className="my-auto py-8 text-center flex flex-col items-center justify-center">
                {/* Visual Cursor Stage Orb */}
                <div className="relative mb-6">
                  {/* Subtle pulsing backdrop halo */}
                  <div className="absolute inset-0 w-28 h-28 -translate-x-3 -translate-y-3 bg-white/5 rounded-full blur-xl" />

                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-105">
                    <CursorIcon
                      type={activeScene.cursor}
                      size={52}
                      variant="light"
                    />
                  </div>
                </div>

                {/* Subtitle / Explanation */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeScene.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-md font-sans">
                  {activeScene.highlightText}
                </p>

                {/* Interactive State Sequence Chips */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  {scenes.map((scene, idx) => (
                    <button
                      key={scene.title}
                      onClick={() => {
                        const targetProgress =
                          scenes.slice(0, idx).reduce((acc, s) => acc + s.durationMs, 0) /
                          totalDuration;
                        setProgress(targetProgress);
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                        currentSceneIndex === idx
                          ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                          : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {scene.cursor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="w-full bg-neutral-900/90 backdrop-blur-md rounded-2xl p-3 border border-neutral-800 flex flex-col gap-2.5">
                {/* Scrubbable Progress Timeline */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
                    setProgress(newProgress);
                  }}
                  className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer overflow-hidden relative group"
                >
                  <div
                    className="h-full bg-white rounded-full relative transition-all duration-75"
                    style={{ width: `${progress * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  {/* Play/Pause & Reset */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                      title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      onClick={() => setProgress(0)}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Restart"
                    >
                      <RotateCcw size={13} />
                    </button>
                    <span className="font-mono text-[11px] text-neutral-400">
                      0:{currentTimeSec.toString().padStart(2, '0')} / 0:{totalTimeSec.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Speed & Video Options */}
                  <div className="flex items-center gap-3">
                    {/* Playback rate */}
                    <button
                      onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : 1)}
                      className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono text-neutral-300"
                    >
                      {playbackSpeed}x
                    </button>

                    {/* Mute */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Toggle Fullscreen"
                    >
                      {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Asset Drop-in Note (for easy maintenance) */}
        <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500 font-mono">
          Ready for local video asset: <span className="text-neutral-600 dark:text-neutral-400">{APP_CONFIG.videoAssets.heroDemo}</span>
        </p>
      </div>
    </section>
  );
};
