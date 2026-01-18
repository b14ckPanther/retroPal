import Link from 'next/link';
import { games, getFeaturedGames } from '@/lib/games';
import GameCard from '@/components/games/GameCard';
import { NeonButton } from '@/components/ui/NeonButton';

export default function Home() {
  const featuredGames = getFeaturedGames();
  const recentGames = games.slice(0, 4);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-neon-purple/10 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Logo Animation */}
          <div className="mb-8 animate-float">
            <span className="text-8xl md:text-9xl">🕹️</span>
          </div>

          {/* Title */}
          <h1 className="font-pixel text-3xl md:text-5xl mb-4">
            <span className="neon-text-cyan">RETRO</span>
            <span className="neon-text-pink">ARCADE</span>
          </h1>

          {/* Tagline */}
          <p className="font-retro text-2xl md:text-3xl text-gray-300 mb-2">
            Relive the Golden Age of Gaming
          </p>
          <p className="font-retro text-xl text-gray-500 mb-8">
            No downloads. No installs. Just pure arcade fun.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/games">
              <NeonButton variant="pink" size="lg" className="coin-slot min-w-[200px]">
                INSERT COIN
              </NeonButton>
            </Link>
            <Link href="/games">
              <NeonButton variant="cyan" size="lg" className="min-w-[200px]">
                BROWSE GAMES
              </NeonButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="font-pixel text-2xl text-neon-cyan">{games.length}</div>
              <div className="font-retro text-lg text-gray-500">Games</div>
            </div>
            <div className="w-px h-12 bg-arcade-border" />
            <div className="text-center">
              <div className="font-pixel text-2xl text-neon-pink">FREE</div>
              <div className="font-retro text-lg text-gray-500">To Play</div>
            </div>
            <div className="w-px h-12 bg-arcade-border" />
            <div className="text-center">
              <div className="font-pixel text-2xl text-neon-gold">∞</div>
              <div className="font-retro text-lg text-gray-500">Fun</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="font-pixel text-[10px] text-neon-cyan mb-2">SCROLL</div>
          <svg className="w-6 h-6 text-neon-cyan mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Game Section */}
      {featuredGames.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl">⭐</span>
              <h2 className="font-pixel text-xl text-neon-gold">FEATURED GAME</h2>
            </div>

            <GameCard game={featuredGames[0]} featured />
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-arcade-surface/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-xl text-neon-cyan text-center mb-12">
            HOW TO PLAY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'CHOOSE', desc: 'Pick a game from our growing collection of nostalgic titles' },
              { icon: '🎮', title: 'PLAY', desc: 'No downloads needed - games run right in your browser' },
              { icon: '🏆', title: 'COMPETE', desc: 'Climb the leaderboards and unlock achievements' },
            ].map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-arcade-surface rounded-full border-2 border-arcade-border flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{step.icon}</span>
                </div>
                <h3 className="font-pixel text-sm text-neon-pink mb-2">{step.title}</h3>
                <p className="font-retro text-lg text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Games Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-3xl">🎮</span>
              <h2 className="font-pixel text-xl text-neon-cyan">ALL GAMES</h2>
            </div>
            <Link href="/games">
              <NeonButton variant="cyan" size="sm">
                VIEW ALL
              </NeonButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGames.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <span className="text-6xl mb-6 block animate-neon-pulse">👾</span>
            <h2 className="font-pixel text-2xl text-neon-pink mb-4">
              READY TO PLAY?
            </h2>
            <p className="font-retro text-xl text-gray-400 mb-8">
              Jump into the action and relive your favorite gaming memories.
              No account needed - just pick a game and start playing!
            </p>
            <Link href="/games">
              <NeonButton variant="gold" size="lg">
                START PLAYING
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
