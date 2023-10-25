import { Stage, Container, TilingSprite, Sprite } from '@pixi/react';
import { useEffect, useState } from 'react';
import { usePlayerStore } from './state/Player.ts';
import { useEnemyStore } from './state/Enemy.ts';
import Player from './components/Player.tsx';
import { CAMERA_SIZE, MAP_SIZE } from './Constants.ts';
import EnemyMapper from './enemies/EnemyMapper.tsx';
import BulletMapper from './components/BulletMapper.tsx';
import { keys } from './Keys.ts';
import './App.css';

const handleKeyDown = (e: KeyboardEvent) => {
  keys[e.key] = true;
};

const handleKeyUp = (e: KeyboardEvent) => {
  keys[e.key] = false;
};

export const MyComponent = () => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const spawnEnemy = useEnemyStore((state) => state.spawnEnemy);
  const health = usePlayerStore((state) => state.health);
  const score = usePlayerStore((state) => state.score);
  const moveSpeed = usePlayerStore((state) => state.moveSpeed);
  const attackSpeed = usePlayerStore((state) => state.attackSpeed);
  const addMoveSpeed = usePlayerStore((state) => state.addMoveSpeed);
  const addAttackSpeed = usePlayerStore((state) => state.addAttackSpeed);

  const [mousePos, setMousePos] = useState({});
  const handleMouseMove = (e: MouseEvent) => {
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
    <main className='mainContainer'>
      <Stage
        width={CAMERA_SIZE}
        height={CAMERA_SIZE}
        options={{
          background: 'black',
        }}
        className='mainStage'
      >
        <Container
          x={CAMERA_SIZE / 2}
          y={CAMERA_SIZE / 2}
          //ZOOM
          // scale={{ x: 2, y: 2 }}
          //CENTRE ON PLAYER
          pivot={{ x: playerX, y: playerY }}
        >
          <TilingSprite
            image={'/space.jpg'}
            height={MAP_SIZE}
            width={MAP_SIZE}
            tilePosition={{ x: 0, y: 0 }}
          />
          <Player x={playerX} y={playerY} mousePos={mousePos} />
          <EnemyMapper enemyList={enemyList} />
          <BulletMapper mousePos={mousePos} />
        </Container>
        <Sprite
          image={'/ProgressBar04.png'}
          y={685}
          x={350}
          height={30}
          width={700}
          angle={180}
          anchor={0.5}
        />
        {health > 0 && (
          <Sprite
            image={'/ProgressBar02.png'}
            y={670}
            x={1}
            height={30}
            width={(health / 100) * 700}
          />
        )}
      </Stage>
      <section className='sidePanel'>
        <h2>STATS</h2>
        <p>Health : {health}</p>
        <p>Score: {score}</p>
        <p>MoveSpeed: {moveSpeed}</p>
        <p>AttackSpeed: {attackSpeed}</p>
        <button onClick={addMoveSpeed}>Increase MoveSpeed</button>
        <button onClick={addAttackSpeed}>Increase AttackSpeed</button>
      </section>
    </main>
  );
};
