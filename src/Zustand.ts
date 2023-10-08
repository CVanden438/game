import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  playerPos: { x: 0, y: 0 },
}));
