'use client';

import { useState } from 'react';
import { games, getAllCategories } from '@/lib/games';
import GameGrid from '@/components/games/GameGrid';

type SortOption = 'name' | 'rating' | 'newest';

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getAllCategories();

  // Filter and sort games
  let filteredGames = [...games];

  // Filter by category
  if (selectedCategory) {
    filteredGames = filteredGames.filter((g) => g.category === selectedCategory);
  }

  // Filter by search
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredGames = filteredGames.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query)
    );
  }

  // Sort
  filteredGames.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'newest':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-pixel text-3xl text-neon-cyan mb-4">GAME LIBRARY</h1>
          <p className="font-retro text-xl text-gray-400">
            Choose your adventure from our collection of nostalgic titles
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="font-pixel text-[10px] text-neon-cyan mb-2 block">
                SEARCH
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className="w-full bg-arcade-bg border-2 border-arcade-border rounded px-4 py-3 font-retro text-lg text-gray-200 placeholder-gray-600 focus-glow transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
                  🔍
                </span>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="font-pixel text-[10px] text-neon-cyan mb-2 block">
                CATEGORY
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 font-retro text-lg rounded border transition-all ${
                    selectedCategory === null
                      ? 'bg-neon-cyan text-arcade-bg border-neon-cyan'
                      : 'bg-arcade-bg text-gray-400 border-arcade-border hover:border-neon-cyan'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 font-retro text-lg rounded border capitalize transition-all ${
                      selectedCategory === cat
                        ? 'bg-neon-pink text-arcade-bg border-neon-pink'
                        : 'bg-arcade-bg text-gray-400 border-arcade-border hover:border-neon-pink'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="font-pixel text-[10px] text-neon-cyan mb-2 block">
                SORT BY
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-arcade-bg border-2 border-arcade-border rounded px-4 py-3 font-retro text-lg text-gray-200 focus-glow transition-all cursor-pointer"
              >
                <option value="name">Name (A-Z)</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-retro text-lg text-gray-400">
            Showing{' '}
            <span className="text-neon-cyan">{filteredGames.length}</span> game
            {filteredGames.length !== 1 ? 's' : ''}
          </p>
          {(selectedCategory || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="font-retro text-lg text-neon-pink hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Games Grid */}
        <GameGrid games={filteredGames} columns={3} />
      </div>
    </div>
  );
}
