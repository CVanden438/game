import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  playerX: 100,
  playerY: 100,
  health: 10,
  moveRight: () => set((state) => ({ playerX: state.playerX + 3 })),
  moveLeft: () => set((state) => ({ playerX: state.playerX - 3 })),
  moveUp: () => set((state) => ({ playerY: state.playerY - 3 })),
  moveDown: () => set((state) => ({ playerY: state.playerY + 3 })),
  moveUpRight: () =>
    set((state) => ({
      playerX: state.playerX + 3 / Math.sqrt(2),
      playerY: state.playerY - 3 / Math.sqrt(2),
    })),
  moveUpLeft: () =>
    set((state) => ({
      playerX: state.playerX - 3 / Math.sqrt(2),
      playerY: state.playerY - 3 / Math.sqrt(2),
    })),
  moveDownLeft: () =>
    set((state) => ({
      playerX: state.playerX - 3 / Math.sqrt(2),
      playerY: state.playerY + 3 / Math.sqrt(2),
    })),
  moveDownRight: () =>
    set((state) => ({
      playerX: state.playerX + 3 / Math.sqrt(2),
      playerY: state.playerY + 3 / Math.sqrt(2),
    })),
  damagePlayer: () =>
    set((state) => ({
      health: state.health - 1,
    })),
}));
