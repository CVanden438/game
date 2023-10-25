import { Graphics, Sprite, useTick } from '@pixi/react';
import { useCallback, useRef, useState } from 'react';
import { useEnemyStore } from '../state/Enemy';
import { usePlayerStore } from '../state/Player';
import { BULLET_SPEED } from '../Constants';
import EnemyBullet from '../components/EnemyBullet';
import { defaultMovement } from '../controllers/movement/defaultMovement';
import { defaultAttack } from '../controllers/attacks/defaultAttack';

const removeBullet = ({ id, enemyBullets, setEnemyBullets }) => {
  const newBullets = enemyBullets.filter((bullet) => {
    return bullet.id !== id;
  });
  setEnemyBullets(newBullets);
};

export const GreenGuy = ({ enemyX, enemyY, x, y, id, data }) => {
  const {
    health,
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
    defaultMovement({ moveEnemy, enemyX, enemyY, id, speed, x, y });
    cooldown.current = cooldown.current + 1;
    if (cooldown.current === fireRate) {
      defaultAttack({
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
        image={'Ship8.png'}
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
