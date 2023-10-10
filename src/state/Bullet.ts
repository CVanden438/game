import { create } from 'zustand';
import { BULLET_SPEED, CAMERA_SIZE } from '../Constants';

const calcTraj = (mousePos) => {
  // Calculate the direction vector
  const directionX = mousePos.x - CAMERA_SIZE / 2;
  const directionY = mousePos.y - CAMERA_SIZE / 2;

  // Normalize the direction vector
  const magnitude = Math.sqrt(
    directionX * directionX + directionY * directionY
  );
  const normalizedDirectionX = directionX / magnitude;
  const normalizedDirectionY = directionY / magnitude;

  // Calculate the initial velocity components with constant speed
  const velocityX = BULLET_SPEED * normalizedDirectionX;
  const velocityY = BULLET_SPEED * normalizedDirectionY;
  return { velocityX, velocityY };
};

export const useBulletStore = create((set) => ({
  bulletList: [],
  fireBullet: (playerX, playerY, mousePos) => {
    set((state) => ({
      bulletList: [
        ...state.bulletList,
        {
          x: playerX,
          y: playerY,
          id: crypto.randomUUID(),
          mousePos,
          velocityX: calcTraj(mousePos).velocityX,
          velocityY: calcTraj(mousePos).velocityY,
        },
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
