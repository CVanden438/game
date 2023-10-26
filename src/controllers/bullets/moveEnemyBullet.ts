import { MAP_SIZE } from '../../Constants';
import { calcEnemyBulletCollision } from '../../functions/calcEnemyBulletCollision';
import { removeBullet } from '../../functions/removeBullet';

export const moveEnemyBullet = ({
  bulletX,
  bulletY,
  playerX,
  playerY,
  damagePlayer,
  id,
  enemyBullets,
  setEnemyBullets,
  setBulletX,
  setBulletY,
  velocityX,
  velocityY,
  setAngle,
}) => {
  if (
    calcEnemyBulletCollision({
      bulletX,
      bulletY,
      playerX,
      playerY,
      damagePlayer,
    })
  ) {
    removeBullet({ id, bullets: enemyBullets, setBullets: setEnemyBullets });
    return;
  }
  if (bulletX < 0 || bulletX > MAP_SIZE) {
    removeBullet({ id, bullets: enemyBullets, setBullets: setEnemyBullets });
    return;
  }
  if (bulletY < 0 || bulletY > MAP_SIZE) {
    removeBullet({ id, bullets: enemyBullets, setBullets: setEnemyBullets });
    return;
  }
  setBulletX(bulletX + velocityX);
  setBulletY(bulletY + velocityY);
  if (velocityX > 0) {
    setAngle(Math.atan(velocityY / velocityX));
  } else {
    setAngle(Math.atan(velocityY / velocityX) + Math.PI);
  }
};
