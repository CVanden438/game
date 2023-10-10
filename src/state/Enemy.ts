import { create } from 'zustand';

export const useEnemyStore = create((set) => ({
  enemyList: [],
}));
