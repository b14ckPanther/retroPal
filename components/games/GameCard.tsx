import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/lib/games';
import { NeonButton } from '@/components/ui/NeonButton';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const categoryColors = {
    platformer: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50',
    puzzle: 'bg-neon-purple/20 text-neon-purple border-neon-purple/50',
    action: 'bg-neon-pink/20 text-neon-pink border-neon-pink/50',
    adventure: 'bg-neon-gold/20 text-neon-gold border-neon-gold/50',
    arcade: 'bg-neon-green/20 text-neon-green border-neon-green/50',
  };

  if (featured) {
    return (
      <div className="game-card group relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Game Preview */}
          <div className="relative md:w-1/2 aspect-video bg-arcade-bg rounded-lg overflow-hidden crt-effect">
            {game.thumbnail ? (
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🎮</span>
                  <p className="font-pixel text-xs text-neon-cyan">FEATURED GAME</p>
                </div>
              </div>
            )}
            {/* Animated border */}
            <div className="absolute inset-0 border-2 border-neon-purple/50 rounded-lg" />
          </div>

          {/* Game Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              {/* Category Badge */}
              <span className={`inline-block px-3 py-1 text-xs font-pixel rounded border ${categoryColors[game.category]}`}>
                {game.category.toUpperCase()}
              </span>

              {/* Title */}
              <h3 className="font-pixel text-lg text-neon-cyan mt-4 mb-2 group-hover:text-neon-pink transition-colors">
                {game.title}
              </h3>

              {/* Description */}
              <p className="font-retro text-xl text-gray-300 mb-4 line-clamp-3">
                {game.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm font-retro text-gray-400">
                {game.rating && (
                  <span className="flex items-center gap-1">
                    <span className="text-neon-gold">★</span>
                    {game.rating.toFixed(1)}
                  </span>
                )}
                <span>v{game.version}</span>
              </div>
            </div>

            {/* Play Button */}
            <div className="mt-6">
              <Link href={`/games/${game.slug}`}>
                <NeonButton variant="pink" size="lg" className="w-full md:w-auto">
                  PLAY NOW
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/games/${game.slug}`} className="game-card group block">
      {/* Game Thumbnail */}
      <div className="relative aspect-video bg-arcade-bg rounded-lg overflow-hidden mb-4 crt-effect">
        {game.thumbnail ? (
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl group-hover:scale-110 transition-transform">🎮</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="font-pixel text-xs text-neon-cyan bg-arcade-bg/80 px-3 py-1 rounded">
            PLAY
          </span>
        </div>
      </div>

      {/* Category Badge */}
      <span className={`inline-block px-2 py-0.5 text-[10px] font-pixel rounded border mb-2 ${categoryColors[game.category]}`}>
        {game.category.toUpperCase()}
      </span>

      {/* Title */}
      <h3 className="font-pixel text-xs text-neon-cyan group-hover:text-neon-pink transition-colors mb-2 line-clamp-1">
        {game.title}
      </h3>

      {/* Description */}
      <p className="font-retro text-base text-gray-400 line-clamp-2">
        {game.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-3 text-sm font-retro text-gray-500">
        {game.rating && (
          <span className="flex items-center gap-1">
            <span className="text-neon-gold text-xs">★</span>
            {game.rating.toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
}
