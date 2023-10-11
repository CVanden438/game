import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { usePlayerStore } from '../state/Player';
import { MAP_SIZE } from '../Constants';

const calcEnemyCollision = ({ bulletX, bulletY, playerX, playerY }) => {
  let collision = false;
  if (
    bulletX > playerX - 20 &&
    bulletX < playerX + 20 &&
    bulletY > playerY - 20 &&
    bulletY < playerY + 20
  ) {
    collision = true;
    // damageEnemy(i.id);
  }
  return collision;
};

const EnemyBullet = ({
  x,
  y,
  removeBullet,
  velocityX,
  velocityY,
  id,
  enemyBullets,
  setEnemyBullets,
}) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const moveBullet = () => {
    if (calcEnemyCollision({ bulletX, bulletY, playerX, playerY })) {
      removeBullet({ id, enemyBullets, setEnemyBullets });
      return;
    }
    if (bulletX < 0 || bulletX > MAP_SIZE) {
      removeBullet({ id, enemyBullets, setEnemyBullets });
      return;
    }
    if (bulletY < 0 || bulletY > MAP_SIZE) {
      removeBullet({ id, enemyBullets, setEnemyBullets });
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

export default EnemyBullet;
