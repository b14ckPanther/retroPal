import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGuestName(): string {
  const adjectives = ['Pixel', 'Retro', 'Neon', 'Cyber', 'Turbo', 'Mega', 'Ultra', 'Super'];
  const nouns = ['Player', 'Gamer', 'Hero', 'Knight', 'Ninja', 'Wizard', 'Hunter', 'Racer'];
  const number = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj}${noun}${number}`;
}

export function formatScore(score: number): string {
  return score.toLocaleString();
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
