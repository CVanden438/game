import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  playerX: 100,
  playerY: 100,
  moveRight: () => set((state) => ({ playerX: state.playerX + 3 })),
  moveLeft: () => set((state) => ({ playerX: state.playerX - 3 })),
  moveUp: () => set((state) => ({ playerY: state.playerY - 3 })),
  moveDown: () => set((state) => ({ playerY: state.playerY + 3 })),
  moveUpRight: () =>
    set((state) => ({
      playerX: state.playerX + 3,
      playerY: state.playerY - 3,
    })),
  moveUpLeft: () =>
    set((state) => ({
      playerX: state.playerX - 3,
      playerY: state.playerY - 3,
    })),
  moveDownLeft: () =>
    set((state) => ({
      playerX: state.playerX - 3,
      playerY: state.playerY + 3,
    })),
  moveDownRight: () =>
    set((state) => ({
      playerX: state.playerX + 3,
      playerY: state.playerY + 3,
    })),
}));