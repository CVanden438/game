import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';
import { usePlayerStore } from '../../state/Player';
import { moveEnemyBullet } from '../../controllers/bullets/moveEnemyBullet';

const EnemyBullet = ({
  x,
  y,
  velocityX,
  velocityY,
  id,
  enemyBullets,
  setEnemyBullets,
  projWidth,
  projHeight,
}) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const damagePlayer = usePlayerStore((state) => state.damagePlayer);
  useTick(() => {
    moveEnemyBullet({
      bulletX,
      bulletY,
      damagePlayer,
      enemyBullets,
      id,
      playerX,
      playerY,
      setAngle,
      setBulletX,
      setBulletY,
      setEnemyBullets,
      velocityX,
      velocityY,
    });
  });
  return (
    <Sprite
      image={'/01.png'}
      x={bulletX}
      y={bulletY}
      height={projWidth}
      width={projHeight}
      anchor={0.5}
      rotation={angle}
    />
  );
};

export default EnemyBullet;
