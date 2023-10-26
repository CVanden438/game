import { MAP_SIZE } from '../../Constants';
import { calcPlayerBulletCollision } from '../../functions/calcPlayerBulletCollision';
import { removeBullet } from '../../functions/removeBullet';

export const movePlayerBullet = ({
  enemyList,
  bulletX,
  bulletY,
  id,
  bullets,
  setBullets,
  damageEnemy,
  setBulletX,
  setBulletY,
  setAngle,
  velocityX,
  velocityY,
}) => {
  if (calcPlayerBulletCollision({ enemyList, bulletX, bulletY, damageEnemy })) {
    removeBullet({ id, bullets, setBullets });
    return;
  }
  if (bulletX < 0 || bulletX > MAP_SIZE) {
    removeBullet({ id, bullets, setBullets });
    return;
  }
  if (bulletY < 0 || bulletY > MAP_SIZE) {
    removeBullet({ id, bullets, setBullets });
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
