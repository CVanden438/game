import { useRef, useState } from 'react';
import { BULLET_SPEED, CAMERA_SIZE } from '../Constants';
import Bullet from './Bullet';
import { useTick } from '@pixi/react';
import { usePlayerStore } from '../state/Player';

const calcTraj = (mousePos) => {
  // Calculate the direction vector
  const directionX = mousePos.x - CAMERA_SIZE / 2;
  const directionY = mousePos.y - CAMERA_SIZE / 2;

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

const fireBullet = ({ playerX, playerY, mousePos, bullets, setBullets }) => {
  setBullets([
    ...bullets,
    {
      x: playerX,
      y: playerY,
      id: crypto.randomUUID(),
      mousePos,
      velocityX: calcTraj(mousePos).velocityX,
      velocityY: calcTraj(mousePos).velocityY,
    },
  ]);
};
const removeBullet = ({ id, bullets, setBullets }) => {
  const newBullets = bullets.filter((bullet) => {
    return bullet.id !== id;
  });
  setBullets(newBullets);
};
const BulletMapper = ({ mousePos }) => {
  const [bullets, setBullets] = useState([]);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const fireRate = usePlayerStore((state) => state.attackSpeed);
  const playerCooldown = useRef(0);
  useTick(() => {
    playerCooldown.current = playerCooldown.current + 1;
    if (playerCooldown.current >= fireRate) {
      fireBullet({ playerX, playerY, mousePos, bullets, setBullets });
      playerCooldown.current = 0;
    }
  });
  return (
    <>
      {bullets &&
        bullets.map((bullet, index) => {
          return (
            <Bullet
              x={bullet.x}
              y={bullet.y}
              mousePos={bullet.mousePos}
              removeBullet={removeBullet}
              id={bullet.id}
              bullets={bullets}
              index={index}
              key={bullet.id}
              setBullets={setBullets}
              velocityX={bullet.velocityX}
              velocityY={bullet.velocityY}
            />
          );
        })}
    </>
  );
};

export default BulletMapper;
