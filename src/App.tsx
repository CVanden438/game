import { Stage, Container, TilingSprite } from '@pixi/react';
import { useEffect, useState } from 'react';
import { usePlayerStore } from './state/Player.ts';
import { useEnemyStore } from './state/Enemy.ts';
import { useBulletStore } from './state/Bullet.ts';
import Bullet from './components/Bullet.tsx';
import Player from './components/Player.tsx';
import Enemy from './components/Enemy.tsx';
import { BULLET_SPEED, CAMERA_SIZE, MAP_SIZE } from './Constants.ts';
import EnemyBullet from './components/EnemyBullet.tsx';
import { useEnemyBulletStore } from './state/EnemyBullet.ts';

export const keys = { w: false, a: false, s: false, d: false };

const handleKeyDown = (e) => {
  keys[e.key] = true;
};

const handleKeyUp = (e) => {
  keys[e.key] = false;
};

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

export const MyComponent = () => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const spawnEnemy = useEnemyStore((state) => state.spawnEnemy);
  // const bulletList = useBulletStore((state) => state.bulletList);
  // const fireBullet = useBulletStore((state) => state.fireBullet);
  // const removeBullet = useBulletStore((state) => state.removeBullet);
  // const enemyBulletList = useEnemyBulletStore((state) => state.enemyBulletList);
  const [mousePos, setMousePos] = useState({});
  const [bullets, setBullets] = useState([]);
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
  return (
    <Stage
      width={CAMERA_SIZE}
      height={CAMERA_SIZE}
      options={{
        background: 'black',
      }}
      onClick={() =>
        fireBullet({ playerX, playerY, mousePos, bullets, setBullets })
      }
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
      </Container>
    </Stage>
  );
};
