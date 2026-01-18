'use client';

export const runtime = 'edge';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getGameBySlug } from '@/lib/games';
import { NeonButton } from '@/components/ui/NeonButton';

export default function GamePlayerPage() {
  const params = useParams();
  const slug = params.slug as string;
  const game = getGameBySlug(slug);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Prevent page scrolling when arrow keys or spacebar are pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys and spacebar to stop page scrolling
      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      const spaceKey = e.key === ' ' || e.code === 'Space';
      
      if (arrowKeys.includes(e.key) || spaceKey) {
        // Only prevent if the event is not coming from an input/textarea (user typing in forms)
        const target = e.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.closest('input, textarea, [contenteditable]')
        ) {
          return;
        }
        // Prevent page scroll - this will stop browser from scrolling
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    // Use capture phase to catch events before they reach other handlers
    document.addEventListener('keydown', handleKeyDown, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown, { passive: false, capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen py-4 px-1">
      <div className="w-full max-w-[98vw] mx-auto">
        {/* Back Button */}
        <Link
          href="/games"
          className="inline-flex items-center gap-2 font-retro text-lg text-gray-400 hover:text-neon-cyan transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </Link>

        <div className="flex flex-col gap-6">
          {/* Game Container */}
          <div className="w-full">
            <div
              ref={containerRef}
              className="relative bg-arcade-bg rounded-lg overflow-hidden arcade-border"
              tabIndex={-1}
              onKeyDown={(e) => {
                // Prevent arrow keys from scrolling the page
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-arcade-bg flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="animate-spin text-6xl mb-4">🕹️</div>
                    <p className="font-pixel text-sm text-neon-cyan animate-neon-pulse">
                      LOADING...
                    </p>
                  </div>
                </div>
              )}

              {/* Game iframe */}
              <div className="relative crt-effect" style={{ aspectRatio: '16/9', width: '100%', minHeight: '600px' }}>
                <iframe
                  ref={iframeRef}
                  src={game.path}
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                  allow="autoplay; fullscreen"
                  title={game.title}
                />
              </div>

              {/* Controls Bar */}
              <div className="flex items-center justify-between p-4 bg-arcade-surface border-t border-arcade-border">
                <div className="flex items-center gap-4">
                  <h2 className="font-pixel text-sm text-neon-cyan hidden sm:block">
                    {game.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="p-2 text-gray-400 hover:text-neon-cyan transition-colors"
                    title="Toggle Info"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-gray-400 hover:text-neon-cyan transition-colors"
                    title="Toggle Fullscreen"
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
            </div>
          </div>

          {/* Info Sidebar */}
          {showInfo && (
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Game Info */}
              <div className="glass-card p-6">
                <h3 className="font-pixel text-sm text-neon-gold mb-4">GAME INFO</h3>
                <p className="font-retro text-lg text-gray-300 mb-4">
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
              <div className="glass-card p-6">
                <h3 className="font-pixel text-sm text-neon-gold mb-4">CONTROLS</h3>
                <div className="space-y-3">
                  {game.controls.map((control, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-retro text-gray-400">{control.action}</span>
                      <span className="font-mono text-xs bg-arcade-bg px-2 py-1 rounded text-neon-cyan">
                        {control.key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="glass-card p-6">
                <h3 className="font-pixel text-sm text-neon-gold mb-4">ACHIEVEMENTS</h3>
                <div className="space-y-3">
                  {game.achievements.slice(0, 5).map((ach) => (
                    <div
                      key={ach.id}
                      className="flex items-center gap-3 p-2 rounded bg-arcade-bg/50"
                    >
                      <span className="text-2xl opacity-50">{ach.icon}</span>
                      <div>
                        <p className="font-retro text-sm text-gray-300">{ach.name}</p>
                        <p className="font-retro text-xs text-gray-500">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                  {game.achievements.length > 5 && (
                    <p className="font-retro text-sm text-gray-500 text-center">
                      +{game.achievements.length - 5} more achievements
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
