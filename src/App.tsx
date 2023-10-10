import { Stage, Container, TilingSprite } from '@pixi/react';
import { useEffect, useState } from 'react';
import { usePlayerStore } from './state/Player.ts';
import { useEnemyStore } from './state/Enemy.ts';
import { useBulletStore } from './state/Bullet.ts';
import Bullet from './components/Bullet.tsx';
import Player from './components/Player.tsx';
import Enemy from './components/Enemy.tsx';
import { CAMERA_SIZE, MAP_SIZE } from './Constants.ts';

export const keys = { w: false, a: false, s: false, d: false };

const handleKeyDown = (e) => {
  keys[e.key] = true;
};

const handleKeyUp = (e) => {
  keys[e.key] = false;
};

export const MyComponent = () => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const spawnEnemy = useEnemyStore((state) => state.spawnEnemy);
  const bulletList = useBulletStore((state) => state.bulletList);
  const fireBullet = useBulletStore((state) => state.fireBullet);
  const removeBullet = useBulletStore((state) => state.removeBullet);
  const [mousePos, setMousePos] = useState({});

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  useEffect(() => {
    const spawn = setInterval(spawnEnemy, 1000);
    return () => clearInterval(spawn);
  }, []);
  enemyList && console.log(enemyList);
  return (
    <Stage
      width={CAMERA_SIZE}
      height={CAMERA_SIZE}
      options={{
        background: 'black',
      }}
      onClick={() => fireBullet(playerX, playerY, mousePos)}
    >
      <Container
        x={CAMERA_SIZE / 2}
        y={CAMERA_SIZE / 2}
        //ZOOM
        // scale={{ x: 2, y: 2 }}
        //CENTRE ON PLAYER
        pivot={{ x: playerX, y: playerY }}
      >
        <TilingSprite image={'/space.jpg'} height={MAP_SIZE} width={MAP_SIZE} />
        <Player x={playerX} y={playerY} />
        {enemyList &&
          enemyList.map((enemy, index) => {
            return (
              <Enemy
                enemyX={enemy.x}
                enemyY={enemy.y}
                key={enemy.id}
                id={enemy.id}
                x={playerX}
                y={playerY}
                health={enemy.health}
              />
            );
          })}
        {bulletList &&
          bulletList.map((bullet, index) => {
            return (
              <Bullet
                x={bullet.x}
                y={bullet.y}
                mousePos={bullet.mousePos}
                removeBullet={removeBullet}
                id={bullet.id}
                bullets={bulletList}
                index={index}
                key={bullet.id}
                velocityX={bullet.velocityX}
                velocityY={bullet.velocityY}
              />
            );
          })}
      </Container>
    </Stage>
  );
};
