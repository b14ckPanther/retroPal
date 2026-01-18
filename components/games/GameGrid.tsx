import { Game } from '@/lib/games';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  columns?: 2 | 3 | 4;
}

export default function GameGrid({ games, columns = 3 }: GameGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (games.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl mb-4 block">🕹️</span>
        <h3 className="font-pixel text-sm text-neon-cyan mb-2">NO GAMES FOUND</h3>
        <p className="font-retro text-lg text-gray-400">
          Check back later for new games!
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  );
}
