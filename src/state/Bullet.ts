import { create } from 'zustand';

export const useBulletStore = create((set) => ({
  bulletList: [],
  fireBullet: (playerX, playerY, mousePos) => {
    set((state) => ({
      bulletList: [
        ...state.bulletList,
        { x: playerX, y: playerY, id: crypto.randomUUID(), mousePos },
      ],
    }));
  },
  removeBullet: (id) => {
    set((state) => ({
      //   bulletList: [...state.bulletList.splice(index, 1)],
      bulletList: state.bulletList.filter((bullet) => {
        return bullet.id !== id;
      }),
    }));
  },
}));

// setBullets([
//   ...bullets,
//   { x: playerX, y: playerY, mousePos, id: crypto.randomUUID() },
// ]);
