'use client';

import { useUserStore } from '@/stores/userStore';
import { games } from '@/lib/games';
import { useState } from 'react';
import Link from 'next/link';

export default function LeaderboardsPage() {
  const { scores, username } = useUserStore();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Get top scores grouped by game
  const leaderboardsByGame = games.map((game) => {
    const gameScores = scores
      .filter((s) => s.gameSlug === game.slug)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    return {
      game,
      scores: gameScores,
    };
  });

  const allScores = scores.sort((a, b) => b.score - a.score).slice(0, 20);

  const displayedLeaderboards = selectedGame
    ? leaderboardsByGame.filter((lb) => lb.game.slug === selectedGame)
    : leaderboardsByGame;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-pixel text-3xl text-neon-cyan mb-4">LEADERBOARDS</h1>
          <p className="font-retro text-xl text-gray-400">Top scores and achievements</p>
        </div>

        {/* Game Filter */}
        <div className="glass-card p-6 mb-8">
          <label className="font-pixel text-[10px] text-neon-cyan mb-2 block">FILTER BY GAME</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGame(null)}
              className={`px-4 py-2 font-retro text-lg rounded border transition-all ${
                selectedGame === null
                  ? 'bg-neon-cyan text-arcade-bg border-neon-cyan'
                  : 'bg-arcade-bg text-gray-400 border-arcade-border hover:border-neon-cyan'
              }`}
            >
              All Games
            </button>
            {games.map((game) => (
              <button
                key={game.slug}
                onClick={() => setSelectedGame(game.slug)}
                className={`px-4 py-2 font-retro text-lg rounded border transition-all ${
                  selectedGame === game.slug
                    ? 'bg-neon-pink text-arcade-bg border-neon-pink'
                    : 'bg-arcade-bg text-gray-400 border-arcade-border hover:border-neon-pink'
                }`}
              >
                {game.title}
              </button>
            ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        {!selectedGame && allScores.length > 0 && (
          <div className="glass-card p-6 mb-8">
            <h2 className="font-pixel text-sm text-neon-gold mb-4">GLOBAL TOP SCORES</h2>
            <div className="space-y-2">
              {allScores.map((score, index) => {
                const game = games.find((g) => g.slug === score.gameSlug);
                const rank = index + 1;
                const isCurrentUser = true; // Since we're using local storage, all scores are from the same user
                return (
                  <div
                    key={`${score.gameSlug}-${score.timestamp}`}
                    className={`flex items-center justify-between p-3 rounded ${
                      isCurrentUser
                        ? 'bg-neon-cyan/10 border border-neon-cyan/30'
                        : 'bg-arcade-bg/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-retro text-lg w-12 text-center text-neon-gold">
                        {getRankIcon(rank)}
                      </div>
                      <div>
                        <div className="font-retro text-lg text-gray-300">
                          {game?.title || score.gameSlug}
                        </div>
                        <div className="font-retro text-xs text-gray-500">
                          {formatDate(score.timestamp)}
                          {score.level && ` • Level ${score.level}`}
                        </div>
                      </div>
                    </div>
                    <div className="font-retro text-xl text-neon-gold">
                      {score.score.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Game-Specific Leaderboards */}
        <div className="space-y-8">
          {displayedLeaderboards.map(({ game, scores: gameScores }) => {
            if (gameScores.length === 0) return null;

            return (
              <div key={game.slug} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-pixel text-sm text-neon-cyan mb-1">{game.title.toUpperCase()}</h2>
                    <p className="font-retro text-sm text-gray-500">{gameScores.length} score{gameScores.length !== 1 ? 's' : ''}</p>
                  </div>
                  <Link
                    href={`/games/${game.slug}`}
                    className="font-retro text-sm text-neon-pink hover:underline"
                  >
                    Play →
                  </Link>
                </div>

                <div className="space-y-2">
                  {gameScores.map((score, index) => {
                    const rank = index + 1;
                    const isCurrentUser = true; // Local storage - all scores from same user
                    return (
                      <div
                        key={`${game.slug}-${score.timestamp}`}
                        className={`flex items-center justify-between p-3 rounded ${
                          isCurrentUser
                            ? 'bg-neon-cyan/10 border border-neon-cyan/30'
                            : 'bg-arcade-bg/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="font-retro text-lg w-12 text-center text-neon-gold">
                            {getRankIcon(rank)}
                          </div>
                          <div>
                            <div className="font-retro text-lg text-gray-300">
                              {username}
                              {isCurrentUser && (
                                <span className="ml-2 text-xs text-neon-cyan">(You)</span>
                              )}
                            </div>
                            <div className="font-retro text-xs text-gray-500">
                              {formatDate(score.timestamp)}
                              {score.level && ` • Level ${score.level}`}
                            </div>
                          </div>
                        </div>
                        <div className="font-retro text-xl text-neon-gold">
                          {score.score.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {scores.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-pixel text-xl text-neon-cyan mb-4">NO SCORES YET</h2>
            <p className="font-retro text-lg text-gray-400 mb-6">
              Start playing games to earn scores and climb the leaderboards!
            </p>
            <Link href="/games">
              <button className="btn-arcade px-6 py-3 text-lg">BROWSE GAMES</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
