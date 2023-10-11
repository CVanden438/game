import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';

const EnemyBullet = ({ x, y, velocityX, velocityY }) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const moveBullet = () => {
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

export default EnemyBullet;
