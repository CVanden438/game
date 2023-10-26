import { useRef, useState } from 'react';
import EnemyBullet from './EnemyBullet';
import { defaultEnemyAttack } from '../../controllers/attacks/defaultEnemyAttack';
import { usePlayerStore } from '../../state/Player';
import { useTick } from '@pixi/react';

export const EnemyBulletMapper = ({
  projWidth,
  projHeight,
  fireRate,
  enemyX,
  enemyY,
}) => {
  const [enemyBullets, setEnemyBullets] = useState([]);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const cooldown = useRef(0);
  useTick(() => {
    cooldown.current = cooldown.current + 1;
    if (cooldown.current === fireRate) {
      defaultEnemyAttack({
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
      {enemyBullets &&
        enemyBullets.map((bullet) => {
          return (
            <EnemyBullet
              x={bullet.x}
              y={bullet.y}
              velocityX={bullet.velocityX}
              velocityY={bullet.velocityY}
              key={bullet.id}
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
