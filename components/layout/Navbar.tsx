'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/games', label: 'Games' },
  { href: '/leaderboards', label: 'Leaderboards' },
  { href: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-arcade-bg/90 backdrop-blur-md border-b border-arcade-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-arcade-surface rounded-lg border-2 border-neon-purple flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                <span className="text-2xl">🕹️</span>
              </div>
              <div className="absolute -inset-1 bg-neon-purple/20 rounded-lg blur-sm group-hover:bg-neon-cyan/20 transition-colors" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-pixel text-sm text-neon-cyan group-hover:text-neon-pink transition-colors">
                RETRO
              </h1>
              <h2 className="font-pixel text-[10px] text-neon-pink group-hover:text-neon-cyan transition-colors">
                PAL
              </h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    px-4 py-2 font-retro text-xl uppercase tracking-wider
                    transition-all duration-200 relative
                    ${isActive
                      ? 'text-neon-cyan'
                      : 'text-gray-400 hover:text-neon-pink'
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-neon-cyan-sm" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Insert Coin Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/games"
              className="btn-arcade text-xs py-2 px-4 coin-slot"
            >
              INSERT COIN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neon-cyan hover:text-neon-pink transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-arcade-surface border-t border-arcade-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 font-retro text-xl uppercase tracking-wider
                    rounded-lg transition-all duration-200
                    ${isActive
                      ? 'text-neon-cyan bg-neon-cyan/10'
                      : 'text-gray-400 hover:text-neon-pink hover:bg-neon-pink/10'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full btn-arcade text-center mt-4"
            >
              INSERT COIN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
