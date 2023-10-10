import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { CAMERA_SIZE, BULLET_SPEED, MAP_SIZE } from '../Constants';
import { useEnemyStore } from '../state/Enemy';

const calcCollision = (enemyList, bulletX, bulletY, damageEnemy) => {
  let collision = false;
  for (const i of enemyList) {
    if (
      bulletX > i.x - 50 &&
      bulletX < i.x + 50 &&
      bulletY > i.y - 50 &&
      bulletY < i.y + 50
    ) {
      collision = true;
      damageEnemy(i.id);
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
}) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const damageEnemy = useEnemyStore((state) => state.damageEnemy);
  const moveBullet = () => {
    if (calcCollision(enemyList, bulletX, bulletY, damageEnemy)) {
      removeBullet(id);
      return;
    }
    if (bulletX < 0 || bulletX > MAP_SIZE) {
      removeBullet(id);
      return;
    }
    if (bulletY < 0 || bulletY > MAP_SIZE) {
      removeBullet(id);
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
      image={'/01.png'}
      x={bulletX}
      y={bulletY}
      height={40}
      width={40}
      anchor={0.5}
      rotation={angle}
    />
  );
};

export default Bullet;