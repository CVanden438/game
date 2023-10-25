import { create } from 'zustand';

type PlayerState = {
  playerX: number;
  playerY: number;
  health: number;
  moveSpeed: number;
  score: number;
  attackSpeed: number;
  movePlayer: ({ moveX, moveY }: { moveX: number; moveY: number }) => void;
  damagePlayer: () => void;
  addScore: (points: number) => void;
  addMoveSpeed: () => void;
  addAttackSpeed: () => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  playerX: 100,
  playerY: 100,
  health: 100,
  moveSpeed: 1,
  score: 0,
  attackSpeed: 50,
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
  addMoveSpeed: () =>
    set((state) => ({
      moveSpeed: state.moveSpeed + 0.1,
    })),
  addAttackSpeed: () =>
    set((state) => ({
      attackSpeed: state.attackSpeed - 5,
    })),
}));
