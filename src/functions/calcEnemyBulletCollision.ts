type CalcEnemyBulletCollision = {
  bulletX: number;
  bulletY: number;
  playerX: number;
  playerY: number;
  damagePlayer: () => void;
};

export const calcEnemyBulletCollision = ({
  bulletX,
  bulletY,
  playerX,
  playerY,
  damagePlayer,
}: CalcEnemyBulletCollision) => {
  let collision = false;
  if (
    bulletX > playerX - 20 &&
    bulletX < playerX + 20 &&
    bulletY > playerY - 20 &&
    bulletY < playerY + 20
  ) {
    collision = true;
    damagePlayer();
  }
  return collision;
};
