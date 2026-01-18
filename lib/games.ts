export interface GameControl {
  key: string;
  action: string;
}

export interface GameAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Game {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'platformer' | 'puzzle' | 'action' | 'adventure' | 'arcade';
  thumbnail: string;
  path: string;
  controls: GameControl[];
  achievements: GameAchievement[];
  releaseDate: string;
  version: string;
  featured?: boolean;
  playCount?: number;
  rating?: number;
}

export const games: Game[] = [
  {
    slug: 'shadow-of-crimson-claw',
    title: 'Shadow of the Crimson Claw',
    description: 'A nostalgic platformer inspired by classic games. Battle enemies, collect treasures, and defeat powerful bosses across 7 unique worlds!',
    longDescription: `Embark on an epic adventure in Shadow of the Crimson Claw, a lovingly crafted platformer that pays homage to the golden age of gaming.

Features:
• 7 unique themed worlds - from Castle Ruins to the Sky Temple
• Epic boss battles with unique attack patterns
• Power-ups including Double Jump, Speed Boost, and Fury mode
• 20 achievements to unlock
• 4 playable characters with different abilities
• Local leaderboards to track your best scores

Can you master all seven levels and defeat the Dark Sorcerer?`,
    category: 'platformer',
    thumbnail: '/games/shadow-of-crimson-claw/thumbnail.png',
    path: '/games/shadow-of-crimson-claw/index.html',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Move' },
      { key: 'Space / W / Up', action: 'Jump' },
      { key: 'X / Click', action: 'Attack' },
      { key: 'C', action: 'Dash' },
      { key: 'ESC', action: 'Pause' },
    ],
    achievements: [
      { id: 'first_blood', name: 'First Blood', description: 'Defeat your first enemy', icon: '⚔️' },
      { id: 'skeleton_slayer', name: 'Skeleton Slayer', description: 'Defeat 50 skeletons', icon: '💀' },
      { id: 'ghost_buster', name: 'Ghost Buster', description: 'Defeat 25 ghosts', icon: '👻' },
      { id: 'boss_hunter', name: 'Boss Hunter', description: 'Defeat all bosses', icon: '🏆' },
      { id: 'treasure_hunter', name: 'Treasure Hunter', description: 'Collect 100 gems', icon: '💎' },
      { id: 'speedrunner', name: 'Speedrunner', description: 'Complete any level under 2 minutes', icon: '⚡' },
      { id: 'untouchable', name: 'Untouchable', description: 'Complete a level without damage', icon: '🛡️' },
      { id: 'perfectionist', name: 'Perfectionist', description: 'Get 3 stars on any level', icon: '⭐' },
    ],
    releaseDate: '2024-01-18',
    version: '1.0.0',
    featured: true,
    playCount: 0,
    rating: 4.8,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getFeaturedGames(): Game[] {
  return games.filter((game) => game.featured);
}

export function getGamesByCategory(category: Game['category']): Game[] {
  return games.filter((game) => game.category === category);
}

export function getAllCategories(): Game['category'][] {
  const categories = new Set(games.map((game) => game.category));
  return Array.from(categories);
}
