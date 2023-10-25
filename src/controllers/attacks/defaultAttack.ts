import { calcEnemyTraj } from '../../functions/calcEnemyBulletTraj';

type DefaultAttack = {
  playerX: number;
  playerY: number;
  enemyX: number;
  enemyY: number;
  enemyBullets: [];
  setEnemyBullets: () => void;
};

export const defaultAttack = ({
  playerX,
  playerY,
  enemyX,
  enemyY,
  enemyBullets,
  setEnemyBullets,
}) => {
  setEnemyBullets([
    ...enemyBullets,
    {
      x: enemyX,
      y: enemyY,
      id: crypto.randomUUID(),
      velocityX: calcEnemyTraj({ playerX, playerY, enemyX, enemyY }).velocityX,
      velocityY: calcEnemyTraj({ playerX, playerY, enemyX, enemyY }).velocityY,
    },
  ]);
};
