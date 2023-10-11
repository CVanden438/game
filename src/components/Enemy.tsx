import { Graphics, Sprite, useTick } from '@pixi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEnemyStore } from '../state/Enemy';
import { useEnemyBulletStore } from '../state/EnemyBullet';
import { usePlayerStore } from '../state/Player';
import { BULLET_SPEED } from '../Constants';
import EnemyBullet from './EnemyBullet';

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

const Enemy = ({ enemyX, enemyY, x, y, id, health }) => {
  const moveEnemyUp = useEnemyStore((state) => state.moveEnemyUp);
  const moveEnemyDown = useEnemyStore((state) => state.moveEnemyDown);
  const moveEnemyLeft = useEnemyStore((state) => state.moveEnemyLeft);
  const moveEnemyRight = useEnemyStore((state) => state.moveEnemyRight);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const playerXRef = useRef(playerX);
  const playerYRef = useRef(playerY);
  const draw = useCallback(
    (g) => {
      g.clear();
      g.lineStyle(2, 0xffffff, 1);
      g.beginFill(0xff0000, 1);
      g.drawRect(-50, 50, 100, 10);
      g.lineStyle(0, 0xfffff, 1);
      g.beginFill(0x00ff00, 1);
      g.drawRect(-50, 50, health * 100, 10);
    },
    [health]
  );
  useTick(() => {
    if (enemyX > x + 100) moveEnemyLeft(id);
    if (enemyX < x - 100) moveEnemyRight(id);
    if (enemyY > y + 100) moveEnemyUp(id);
    if (enemyY < y - 100) moveEnemyDown(id);
  });
  //   useEffect(() => {
  //     const fire = setInterval(
  //       () =>
  //         fireBullet({
  //           playerX: playerXRef.current,
  //           playerY: playerYRef.current,
  //           enemyX,
  //           enemyY,
  //           enemyBullets,
  //           setEnemyBullets,
  //         }),
  //       1000
  //     );
  //     return () => clearInterval(fire);
  //   }, [enemyBullets]);
  useEffect(() => {
    playerXRef.current = playerX;
    playerYRef.current = playerY;
  }, [playerX, playerY]);
  return (
    <>
      <Sprite
        image='Ship18.png'
        x={enemyX}
        y={enemyY}
        height={100}
        width={100}
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
            />
          );
        })}
    </>
  );
};

export default Enemy;
