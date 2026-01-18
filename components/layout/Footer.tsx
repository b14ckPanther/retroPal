import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-arcade-bg border-t border-arcade-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-arcade-surface rounded-lg border-2 border-neon-purple flex items-center justify-center">
                <span className="text-2xl">🕹️</span>
              </div>
              <div>
                <h3 className="font-pixel text-sm text-neon-cyan">RETRO</h3>
                <h4 className="font-pixel text-[10px] text-neon-pink">PAL</h4>
              </div>
            </div>
            <p className="font-retro text-lg text-gray-400 max-w-md">
              Relive the golden age of gaming with our collection of nostalgic
              browser games. No downloads, no installs - just pure arcade fun.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-pixel text-xs text-neon-gold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {[
                { href: '/games', label: 'All Games' },
                { href: '/leaderboards', label: 'Leaderboards' },
                { href: '/profile', label: 'My Profile' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-retro text-lg text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="font-pixel text-xs text-neon-gold mb-4">ARCADE STATS</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-neon-cyan">🎮</span>
                <span className="font-retro text-lg text-gray-400">1 Game</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-pink">🏆</span>
                <span className="font-retro text-lg text-gray-400">20 Achievements</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neon-gold">⭐</span>
                <span className="font-retro text-lg text-gray-400">Free to Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-arcade-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-retro text-lg text-gray-500">
            © 2026 RetroPal. Developed by nmProfessor
          </p>
          <div className="flex items-center gap-4">
            <span className="font-pixel text-[10px] text-gray-600 animate-neon-pulse">
              INSERT COIN TO CONTINUE
            </span>
          </div>
        </div>
      </div>

      {/* Decorative scanlines */}
      <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple opacity-50" />
    </footer>
  );
}
