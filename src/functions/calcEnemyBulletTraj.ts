import { BULLET_SPEED } from '../Constants';

type CalcEnemyBulletTraj = {
  playerX: number;
  playerY: number;
  enemyX: number;
  enemyY: number;
};

export const calcEnemyTraj = ({
  playerX,
  playerY,
  enemyX,
  enemyY,
}: CalcEnemyBulletTraj) => {
  // Calculate the direction vector
  const directionX = playerX - enemyX;
  const directionY = playerY - enemyY;

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
