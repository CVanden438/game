import { Graphics, Sprite, useTick } from '@pixi/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEnemyStore } from '../../state/Enemy';
import { useEnemyBulletStore } from '../../state/EnemyBullet';
import { usePlayerStore } from '../../state/Player';
import { BULLET_SPEED } from '../../Constants';
import EnemyBullet from '../bullets/EnemyBullet';
import { defaultMovement } from '../../controllers/movement/defaultMovement';
import { radialMovement } from '../../controllers/movement/radialMovement';
import { defaultAttack } from '../../controllers/attacks/defaultEnemyAttack';
import { EnemyBulletMapper } from '../bullets/EnemyBulletMapper';

export const SmallGuy = ({ enemyX, enemyY, x, y, id, data }) => {
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
    radialMovement({ moveEnemy, enemyX, enemyY, id, speed, x, y });
  });
  return (
    <>
      <Sprite
        image={'Ship13.png'}
        x={enemyX}
        y={enemyY}
        height={height}
        width={width}
        anchor={0.5}
      />
      <Graphics draw={draw} x={enemyX} y={enemyY} />
      <EnemyBulletMapper
        enemyX={enemyX}
        enemyY={enemyY}
        fireRate={fireRate}
        projHeight={projHeight}
        projWidth={projWidth}
      />
    </>
  );
};
