import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { CAMERA_SIZE, BULLET_SPEED, MAP_SIZE } from '../Constants';
import { useEnemyStore } from '../state/Enemy';

const calcCollision = (enemyList, bulletX, bulletY, damageEnemy, killEnemy) => {
  let collision = false;
  for (const i of enemyList) {
    if (
      bulletX > i.x - i.data.width / 2 &&
      bulletX < i.x + i.data.width / 2 &&
      bulletY > i.y - i.data.height / 2 &&
      bulletY < i.y + i.data.height / 2
    ) {
      collision = true;
      damageEnemy(i.id);
      // killEnemy();
    }
  }
  return collision;
};

const Bullet = ({
  x,
  y,
  mousePos,
  removeBullet,
  bullets,
  id,
  index,
  velocityX,
  velocityY,
  setBullets,
}) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const damageEnemy = useEnemyStore((state) => state.damageEnemy);
  const killEnemy = useEnemyStore((state) => state.killEnemy);
  const moveBullet = () => {
    if (calcCollision(enemyList, bulletX, bulletY, damageEnemy, killEnemy)) {
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
    // const newArray = bullets.splice(index, 1);
    // setBullets([...bullets]);
    if (velocityX > 0) {
      setAngle(Math.atan(velocityY / velocityX));
    } else {
      setAngle(Math.atan(velocityY / velocityX) + Math.PI);
    }
  };
  useTick(() => {
    moveBullet();
  });
  return (
    <Sprite
      image={'/13.png'}
      x={bulletX}
      y={bulletY}
      height={60}
      width={60}
      anchor={0.5}
      rotation={angle}
    />
  );
};

export default Bullet;
