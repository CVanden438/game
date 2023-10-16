import { Graphics, Sprite, useTick } from '@pixi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEnemyStore } from '../state/Enemy';
import { useEnemyBulletStore } from '../state/EnemyBullet';
import { usePlayerStore } from '../state/Player';
import { BULLET_SPEED } from '../Constants';
import EnemyBullet from '../components/EnemyBullet';
import DefaultMovement from '../controllers/movement/DefaultMovement';
import RadialMovement from '../controllers/movement/RadialMovement';

const calcEnemyTraj = ({ playerX, playerY, enemyX, enemyY }) => {
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

const fireBullet = ({
  playerX,
  playerY,
  enemyX,
  enemyY,
  enemyBullets,
  setEnemyBullets,
}) => {
  setEnemyBullets([
    ...enemyBullets,
    {
      x: enemyX,
      y: enemyY,
      id: crypto.randomUUID(),
      velocityX: calcEnemyTraj({ playerX, playerY, enemyX, enemyY }).velocityX,
      velocityY: calcEnemyTraj({ playerX, playerY, enemyX, enemyY }).velocityY,
    },
  ]);
};

const removeBullet = ({ id, enemyBullets, setEnemyBullets }) => {
  const newBullets = enemyBullets.filter((bullet) => {
    return bullet.id !== id;
  });
  setEnemyBullets(newBullets);
};

const BigGuy = ({ enemyX, enemyY, x, y, id, data }) => {
  const {
    health,
    name,
    height,
    width,
    speed,
    fireRate,
    maxHealth,
    projWidth,
    projHeight,
  } = data;
  const moveEnemy = useEnemyStore((state) => state.moveEnemy);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const cooldown = useRef(0);
  const draw = useCallback(
    (g) => {
      g.clear();
      g.lineStyle(2, 0xffffff, 1);
      g.beginFill(0xff0000, 1);
      g.drawRect(-width / 2, width / 2, width, 10);
      g.lineStyle(0, 0xfffff, 1);
      g.beginFill(0x00ff00, 1);
      g.drawRect(-width / 2, width / 2, (health / maxHealth) * width, 10);
    },
    [health]
  );
  useTick(() => {
    DefaultMovement({ moveEnemy, enemyX, enemyY, id, speed, x, y });
    cooldown.current = cooldown.current + 1;
    if (cooldown.current === fireRate) {
      fireBullet({
        playerX,
        playerY,
        enemyX,
        enemyY,
        enemyBullets,
        setEnemyBullets,
      });
      cooldown.current = 0;
    }
  });
  return (
    <>
      <Sprite
        image={name === 'bigGuy' ? 'Ship18.png' : 'Ship13.png'}
        x={enemyX}
        y={enemyY}
        height={height}
        width={width}
        anchor={0.5}
      />
      <Graphics draw={draw} x={enemyX} y={enemyY} />
      {enemyBullets &&
        enemyBullets.map((bullet) => {
          return (
            <EnemyBullet
              x={bullet.x}
              y={bullet.y}
              velocityX={bullet.velocityX}
              velocityY={bullet.velocityY}
              key={bullet.id}
              removeBullet={removeBullet}
              id={bullet.id}
              enemyBullets={enemyBullets}
              setEnemyBullets={setEnemyBullets}
              projWidth={projWidth}
              projHeight={projHeight}
            />
          );
        })}
    </>
  );
};

export default BigGuy;
