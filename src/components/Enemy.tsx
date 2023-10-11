import { Graphics, Sprite, useTick } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { useEnemyStore } from '../state/Enemy';
import { useEnemyBulletStore } from '../state/EnemyBullet';
import { usePlayerStore } from '../state/Player';

const Enemy = ({ enemyX, enemyY, x, y, id, health }) => {
  const moveEnemyUp = useEnemyStore((state) => state.moveEnemyUp);
  const moveEnemyDown = useEnemyStore((state) => state.moveEnemyDown);
  const moveEnemyLeft = useEnemyStore((state) => state.moveEnemyLeft);
  const moveEnemyRight = useEnemyStore((state) => state.moveEnemyRight);
  const fireEnemyBullet = useEnemyBulletStore((state) => state.fireBullet);
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
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
  //   const test = () => {
  //     fireEnemyBullet({ enemyX, enemyY, playerX, playerY });
  //   };
  //   useEffect(() => {
  //     const fire = setInterval(() => {
  //       fireEnemyBullet({ enemyX, enemyY, playerX, playerY });
  //     }, 1000);
  //     return () => clearInterval(fire);
  //   }, []);
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
    </>
  );
};

export default Enemy;
