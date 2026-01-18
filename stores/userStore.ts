import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameScore {
  gameSlug: string;
  score: number;
  timestamp: string;
  level?: number;
}

export interface AchievementProgress {
  gameSlug: string;
  achievementId: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number; // 0-100
}

export interface GamePlayHistory {
  gameSlug: string;
  playCount: number;
  totalPlayTime: number; // in seconds
  lastPlayed: string;
  bestScore?: number;
}

export interface UserState {
  username: string;
  totalScore: number;
  gamesPlayed: number;
  achievementsUnlocked: number;
  scores: GameScore[];
  achievements: AchievementProgress[];
  playHistory: GamePlayHistory[];
  
  // Actions
  setUsername: (username: string) => void;
  addScore: (score: GameScore) => void;
  unlockAchievement: (gameSlug: string, achievementId: string) => void;
  updateAchievementProgress: (gameSlug: string, achievementId: string, progress: number) => void;
  recordPlay: (gameSlug: string, playTime?: number) => void;
  getBestScore: (gameSlug: string) => number | undefined;
  getAchievementProgress: (gameSlug: string, achievementId: string) => AchievementProgress | undefined;
  getTopScores: (gameSlug: string, limit?: number) => GameScore[];
  getPlayHistory: (gameSlug: string) => GamePlayHistory | undefined;
  reset: () => void;
}

const initialState = {
  username: 'Player',
  totalScore: 0,
  gamesPlayed: 0,
  achievementsUnlocked: 0,
  scores: [],
  achievements: [],
  playHistory: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUsername: (username) =>
        set({ username }),

      addScore: (score) =>
        set((state) => {
          const newScores = [...state.scores, score].sort((a, b) => b.score - a.score);
          const totalScore = newScores.reduce((sum, s) => sum + s.score, 0);
          return {
            scores: newScores,
            totalScore,
          };
        }),

      unlockAchievement: (gameSlug, achievementId) =>
        set((state) => {
          const existing = state.achievements.find(
            (a) => a.gameSlug === gameSlug && a.achievementId === achievementId
          );

          if (existing && existing.unlocked) {
            return state; // Already unlocked
          }

          const newAchievement: AchievementProgress = {
            gameSlug,
            achievementId,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            progress: 100,
          };

          const achievements = existing
            ? state.achievements.map((a) =>
                a.gameSlug === gameSlug && a.achievementId === achievementId
                  ? newAchievement
                  : a
              )
            : [...state.achievements, newAchievement];

          return {
            achievements,
            achievementsUnlocked: achievements.filter((a) => a.unlocked).length,
          };
        }),

      updateAchievementProgress: (gameSlug, achievementId, progress) =>
        set((state) => {
          const existing = state.achievements.find(
            (a) => a.gameSlug === gameSlug && a.achievementId === achievementId
          );

          if (existing && existing.unlocked) {
            return state; // Already unlocked, don't update
          }

          const updatedAchievement: AchievementProgress = existing
            ? { ...existing, progress: Math.min(100, Math.max(0, progress)) }
            : {
                gameSlug,
                achievementId,
                unlocked: false,
                progress: Math.min(100, Math.max(0, progress)),
              };

          const achievements = existing
            ? state.achievements.map((a) =>
                a.gameSlug === gameSlug && a.achievementId === achievementId
                  ? updatedAchievement
                  : a
              )
            : [...state.achievements, updatedAchievement];

          return { achievements };
        }),

      recordPlay: (gameSlug, playTime = 0) =>
        set((state) => {
          const existing = state.playHistory.find((h) => h.gameSlug === gameSlug);
          const now = new Date().toISOString();

          const updatedHistory: GamePlayHistory = existing
            ? {
                ...existing,
                playCount: existing.playCount + 1,
                totalPlayTime: existing.totalPlayTime + playTime,
                lastPlayed: now,
              }
            : {
                gameSlug,
                playCount: 1,
                totalPlayTime: playTime,
                lastPlayed: now,
              };

          const playHistory = existing
            ? state.playHistory.map((h) => (h.gameSlug === gameSlug ? updatedHistory : h))
            : [...state.playHistory, updatedHistory];

          const gamesPlayed = new Set(playHistory.map((h) => h.gameSlug)).size;

          return { playHistory, gamesPlayed };
        }),

      getBestScore: (gameSlug) => {
        const state = get();
        const gameScores = state.scores
          .filter((s) => s.gameSlug === gameSlug)
          .sort((a, b) => b.score - a.score);
        return gameScores[0]?.score;
      },

      getAchievementProgress: (gameSlug, achievementId) => {
        const state = get();
        return state.achievements.find(
          (a) => a.gameSlug === gameSlug && a.achievementId === achievementId
        );
      },

      getTopScores: (gameSlug, limit = 10) => {
        const state = get();
        return state.scores
          .filter((s) => s.gameSlug === gameSlug)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit);
      },

      getPlayHistory: (gameSlug) => {
        const state = get();
        return state.playHistory.find((h) => h.gameSlug === gameSlug);
      },

      reset: () => set(initialState),
    }),
    {
      name: 'retropal-user-storage',
      version: 1,
    }
  )
);
