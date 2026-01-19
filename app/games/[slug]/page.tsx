'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getGameBySlug } from '@/lib/games';
import { NeonButton } from '@/components/ui/NeonButton';

export default function GamePlayerPage() {
  const params = useParams();
  const slug = params.slug as string;
  const game = getGameBySlug(slug);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Prevent ALL scrolling on this page
  useEffect(() => {
    // Disable body scroll completely on game page
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Prevent arrow keys and space from scrolling
  useEffect(() => {
    const preventScroll = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Space'];
      if (keys.includes(e.key) || keys.includes(e.code)) {
        const target = e.target as HTMLElement;
        // Allow if user is typing in form elements
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          return;
        }
        e.preventDefault();
      }
    };

    // Prevent scroll on wheel as well when game is focused
    const preventWheelScroll = (e: WheelEvent) => {
      if (isFocused) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventScroll, { passive: false });
    window.addEventListener('wheel', preventWheelScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', preventScroll);
      window.removeEventListener('wheel', preventWheelScroll);
    };
  }, [isFocused]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, []);

  const focusGame = useCallback(() => {
    setIsFocused(true);
    iframeRef.current?.focus();
  }, []);

  if (!game) {
    return (
      <div className="h-screen flex items-center justify-center bg-arcade-bg">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🕹️</span>
          <h1 className="font-pixel text-xl text-neon-pink mb-4">GAME NOT FOUND</h1>
          <p className="font-retro text-lg text-gray-400 mb-8">
            The game you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/games">
            <NeonButton variant="cyan">BACK TO GAMES</NeonButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-arcade-bg overflow-hidden">
      {/* Top Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-arcade-surface/80 backdrop-blur border-b border-arcade-border z-20">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 font-retro text-base text-gray-400 hover:text-neon-cyan transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </Link>

        <h1 className="font-pixel text-xs sm:text-sm text-neon-cyan truncate max-w-[200px] sm:max-w-none">
          {game.title}
        </h1>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded transition-colors ${showInfo ? 'text-neon-cyan bg-neon-cyan/10' : 'text-gray-400 hover:text-neon-cyan'}`}
            title="Game Info"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-400 hover:text-neon-pink transition-colors rounded"
            title="Fullscreen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Game Container */}
        <div className={`flex-1 flex items-center justify-center p-2 sm:p-4 transition-all ${showInfo ? 'lg:pr-0' : ''}`}>
          <div
            ref={containerRef}
            className="relative w-full h-full max-h-full bg-black rounded-lg overflow-hidden"
            style={{ maxWidth: 'calc((100vh - 120px) * 16 / 9)' }}
          >
            {/* CRT Border Effect */}
            <div className="absolute inset-0 rounded-lg border-4 border-arcade-border shadow-[inset_0_0_60px_rgba(0,0,0,0.8),0_0_30px_rgba(191,0,255,0.2)] pointer-events-none z-10" />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-arcade-bg flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🕹️</div>
                  <p className="font-pixel text-sm text-neon-cyan animate-pulse">
                    LOADING...
                  </p>
                  <p className="font-retro text-gray-500 mt-2">Preparing your adventure</p>
                </div>
              </div>
            )}

            {/* Click to Focus Overlay */}
            {!isLoading && !isFocused && (
              <div
                onClick={focusGame}
                className="absolute inset-0 bg-black/60 flex items-center justify-center z-15 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
                  <p className="font-pixel text-sm text-neon-cyan mb-2">CLICK TO PLAY</p>
                  <p className="font-retro text-gray-400 text-sm">Click anywhere to start</p>
                </div>
              </div>
            )}

            {/* Game iframe */}
            <iframe
              ref={iframeRef}
              src={game.path}
              className="absolute inset-0 w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              allow="autoplay; fullscreen"
              title={game.title}
              tabIndex={0}
            />

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-20"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
              }}
            />
          </div>
        </div>

        {/* Info Sidebar */}
        {showInfo && (
          <div className="hidden lg:block w-80 flex-shrink-0 bg-arcade-surface/50 backdrop-blur border-l border-arcade-border overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Game Info */}
              <div className="glass-card p-4">
                <h3 className="font-pixel text-xs text-neon-gold mb-3 flex items-center gap-2">
                  <span>📋</span> INFO
                </h3>
                <p className="font-retro text-base text-gray-300 mb-3 leading-relaxed">
                  {game.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-retro text-gray-500">Category</span>
                    <span className="font-retro text-neon-pink capitalize">{game.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-retro text-gray-500">Version</span>
                    <span className="font-retro text-gray-300">{game.version}</span>
                  </div>
                  {game.rating && (
                    <div className="flex justify-between">
                      <span className="font-retro text-gray-500">Rating</span>
                      <span className="font-retro text-neon-gold">★ {game.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="glass-card p-4">
                <h3 className="font-pixel text-xs text-neon-gold mb-3 flex items-center gap-2">
                  <span>🎮</span> CONTROLS
                </h3>
                <div className="space-y-2">
                  {game.controls.map((control, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <span className="font-retro text-gray-400">{control.action}</span>
                      <kbd className="font-mono text-[10px] bg-arcade-bg px-2 py-1 rounded text-neon-cyan border border-arcade-border">
                        {control.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements Preview */}
              <div className="glass-card p-4">
                <h3 className="font-pixel text-xs text-neon-gold mb-3 flex items-center gap-2">
                  <span>🏆</span> ACHIEVEMENTS
                </h3>
                <div className="space-y-2">
                  {game.achievements.slice(0, 4).map((ach) => (
                    <div
                      key={ach.id}
                      className="flex items-center gap-2 p-2 rounded bg-arcade-bg/50 group hover:bg-arcade-bg transition-colors"
                    >
                      <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{ach.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-retro text-xs text-gray-300 truncate">{ach.name}</p>
                      </div>
                    </div>
                  ))}
                  {game.achievements.length > 4 && (
                    <p className="font-retro text-xs text-gray-500 text-center pt-2">
                      +{game.achievements.length - 4} more
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="glass-card p-4">
                <h3 className="font-pixel text-xs text-neon-gold mb-3 flex items-center gap-2">
                  <span>💡</span> TIPS
                </h3>
                <ul className="space-y-2 text-xs font-retro text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan">•</span>
                    Press ESC to pause the game
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan">•</span>
                    Collect gems to unlock characters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neon-cyan">•</span>
                    Checkpoints save your progress
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Info Panel */}
      {showInfo && (
        <div className="lg:hidden fixed inset-0 bg-black/80 z-30 flex items-end">
          <div className="w-full max-h-[70vh] bg-arcade-surface rounded-t-2xl overflow-hidden animate-slide-up">
            <div className="sticky top-0 bg-arcade-surface border-b border-arcade-border p-4 flex items-center justify-between">
              <h3 className="font-pixel text-sm text-neon-cyan">Game Info</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(70vh-60px)]">
              {/* Controls */}
              <div>
                <h4 className="font-pixel text-xs text-neon-gold mb-2">CONTROLS</h4>
                <div className="grid grid-cols-2 gap-2">
                  {game.controls.map((control, i) => (
                    <div key={i} className="flex justify-between items-center bg-arcade-bg/50 p-2 rounded">
                      <span className="font-retro text-sm text-gray-400">{control.action}</span>
                      <kbd className="font-mono text-[10px] text-neon-cyan">{control.key}</kbd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-pixel text-xs text-neon-gold mb-2">ABOUT</h4>
                <p className="font-retro text-sm text-gray-300">{game.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
