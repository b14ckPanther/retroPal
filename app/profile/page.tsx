'use client';

import { useUserStore } from '@/stores/userStore';
import { games } from '@/lib/games';
import { useState } from 'react';
import { NeonButton } from '@/components/ui/NeonButton';

export default function ProfilePage() {
  const {
    username,
    setUsername,
    totalScore,
    gamesPlayed,
    achievementsUnlocked,
    scores,
    achievements,
    playHistory,
    reset,
  } = useUserStore();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const unlockedByGame = games.map((game) => {
    const gameAchievements = unlockedAchievements.filter((a) => a.gameSlug === game.slug);
    return {
      game,
      count: gameAchievements.length,
      total: game.achievements.length,
      achievements: gameAchievements,
    };
  });

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
    } else {
      setNewUsername(username);
    }
    setIsEditingUsername(false);
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-pixel text-3xl text-neon-cyan mb-4">PROFILE</h1>
          <p className="font-retro text-xl text-gray-400">Your gaming journey and achievements</p>
        </div>

        {/* Username Section */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <label className="font-pixel text-[10px] text-neon-cyan mb-2 block">PLAYER NAME</label>
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveUsername();
                      if (e.key === 'Escape') {
                        setNewUsername(username);
                        setIsEditingUsername(false);
                      }
                    }}
                    className="bg-arcade-bg border-2 border-arcade-border rounded px-4 py-2 font-retro text-lg text-gray-200 focus-glow transition-all"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="px-4 py-2 bg-neon-cyan text-arcade-bg font-retro rounded hover:bg-neon-cyan/80 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setNewUsername(username);
                      setIsEditingUsername(false);
                    }}
                    className="px-4 py-2 bg-arcade-surface text-gray-400 font-retro rounded hover:bg-arcade-border transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <h2 className="font-retro text-2xl text-gray-200">{username}</h2>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="text-gray-500 hover:text-neon-cyan transition-colors"
                    title="Edit username"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="font-pixel text-[10px] text-neon-cyan mb-1">TOTAL SCORE</div>
                <div className="font-retro text-xl text-neon-gold">{totalScore.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-2">🎮</div>
            <div className="font-pixel text-[10px] text-neon-cyan mb-2">GAMES PLAYED</div>
            <div className="font-retro text-2xl text-neon-pink">{gamesPlayed}</div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <div className="font-pixel text-[10px] text-neon-cyan mb-2">ACHIEVEMENTS</div>
            <div className="font-retro text-2xl text-neon-gold">
              {achievementsUnlocked}/{achievements.length > 0 ? achievements.length : '0'}
            </div>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <div className="font-pixel text-[10px] text-neon-cyan mb-2">HIGH SCORES</div>
            <div className="font-retro text-2xl text-neon-cyan">{scores.length}</div>
          </div>
        </div>

        {/* Recent Scores */}
        {scores.length > 0 && (
          <div className="glass-card p-6 mb-8">
            <h3 className="font-pixel text-sm text-neon-cyan mb-4">RECENT SCORES</h3>
            <div className="space-y-2">
              {scores
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 5)
                .map((score, index) => {
                  const game = games.find((g) => g.slug === score.gameSlug);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-arcade-bg/50 rounded"
                    >
                      <div>
                        <div className="font-retro text-lg text-gray-300">
                          {game?.title || score.gameSlug}
                        </div>
                        <div className="font-retro text-xs text-gray-500">
                          {new Date(score.timestamp).toLocaleDateString()}
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

        {/* Play History */}
        {playHistory.length > 0 && (
          <div className="glass-card p-6 mb-8">
            <h3 className="font-pixel text-sm text-neon-cyan mb-4">PLAY HISTORY</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playHistory.map((history) => {
                const game = games.find((g) => g.slug === history.gameSlug);
                if (!game) return null;
                return (
                  <div
                    key={history.gameSlug}
                    className="p-4 bg-arcade-bg/50 rounded flex items-center justify-between"
                  >
                    <div>
                      <div className="font-retro text-lg text-gray-300">{game.title}</div>
                      <div className="font-retro text-sm text-gray-500">
                        {history.playCount} plays • {formatPlayTime(history.totalPlayTime)}
                      </div>
                      {history.bestScore && (
                        <div className="font-retro text-sm text-neon-gold mt-1">
                          Best: {history.bestScore.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Achievements by Game */}
        {unlockedByGame.some((g) => g.count > 0) && (
          <div className="glass-card p-6 mb-8">
            <h3 className="font-pixel text-sm text-neon-cyan mb-4">ACHIEVEMENTS BY GAME</h3>
            <div className="space-y-6">
              {unlockedByGame
                .filter((g) => g.count > 0)
                .map(({ game, count, total, achievements: gameAchievements }) => {
                  const allGameAchievements = game.achievements;
                  return (
                    <div key={game.slug} className="bg-arcade-bg/50 p-4 rounded">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-retro text-lg text-gray-300">{game.title}</h4>
                        <span className="font-retro text-sm text-neon-gold">
                          {count}/{total}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {allGameAchievements.map((ach) => {
                          const unlocked = gameAchievements.some((a) => a.achievementId === ach.id);
                          return (
                            <div
                              key={ach.id}
                              className={`p-2 rounded flex items-center gap-2 ${
                                unlocked ? 'bg-neon-cyan/10' : 'bg-arcade-bg/30 opacity-50'
                              }`}
                            >
                              <span className="text-xl">{ach.icon}</span>
                              <div>
                                <div className={`font-retro text-sm ${unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                                  {ach.name}
                                </div>
                                {unlocked && (
                                  <div className="font-retro text-xs text-gray-500">
                                    {ach.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-center">
          <NeonButton
            variant="pink"
            onClick={() => {
              if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                reset();
              }
            }}
          >
            Reset Profile
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
