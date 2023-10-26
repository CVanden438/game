import { calcPlayerBulletTraj } from '../../functions/calcPlayerBulletTraj';

export const playerAttack = ({
  playerX,
  playerY,
  mousePos,
  bullets,
  setBullets,
}) => {
  setBullets([
    ...bullets,
    {
      x: playerX,
      y: playerY,
      id: crypto.randomUUID(),
      mousePos,
      velocityX: calcPlayerBulletTraj({ mousePos }).velocityX,
      velocityY: calcPlayerBulletTraj({ mousePos }).velocityY,
    },
  ]);
};
