import { calcEnemyBulletTraj } from '../../functions/calcEnemyBulletTraj';

type DefaultAttack = {
  playerX: number;
  playerY: number;
  enemyX: number;
  enemyY: number;
  enemyBullets: [];
  setEnemyBullets: () => void;
};

export const defaultEnemyAttack = ({
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
      velocityX: calcEnemyBulletTraj({ playerX, playerY, enemyX, enemyY })
        .velocityX,
      velocityY: calcEnemyBulletTraj({ playerX, playerY, enemyX, enemyY })
        .velocityY,
    },
  ]);
};
