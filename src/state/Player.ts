import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  playerX: 100,
  playerY: 100,
  health: 100,
  moveSpeed: 1,
  score: 0,
  attackSpeed: 1,
  movePlayer: ({ moveX, moveY }) =>
    set((state) => ({
      playerX: state.playerX + moveX * state.moveSpeed,
      playerY: state.playerY + moveY * state.moveSpeed,
    })),
  damagePlayer: () =>
    set((state) => ({
      health: state.health - 1,
    })),
  addScore: (points) =>
    set((state) => ({
      score: state.score + points,
    })),
}));
