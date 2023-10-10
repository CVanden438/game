import {
  Stage,
  Sprite,
  useTick,
  Container,
  TilingSprite,
  Graphics,
  Text,
} from '@pixi/react';
import { Color } from 'pixi.js';
import { useEffect, useState, useCallback } from 'react';
import { usePlayerStore } from './state/Player.ts';
import { useEnemyStore } from './state/Enemy.ts';

const keys = { w: false, a: false, s: false, d: false };

const handleKeyDown = (e) => {
  keys[e.key] = true;
};

const handleKeyUp = (e) => {
  keys[e.key] = false;
};

const BULLET_SPEED = 3;
const MAP_SIZE = 5000;
const CAMERA_SIZE = 700;

const Bunny = ({ x, setX, y, setY }) => {
  const moveUp = usePlayerStore((state) => state.moveUp);
  const moveDown = usePlayerStore((state) => state.moveDown);
  const moveLeft = usePlayerStore((state) => state.moveLeft);
  const moveRight = usePlayerStore((state) => state.moveRight);
  const moveUpLeft = usePlayerStore((state) => state.moveUpLeft);
  const moveUpRight = usePlayerStore((state) => state.moveUpRight);
  const moveDownLeft = usePlayerStore((state) => state.moveDownLeft);
  const moveDownRight = usePlayerStore((state) => state.moveDownRight);
  const [angle, setAngle] = useState(0);
  useTick(() => {
    if (keys['w'] && keys['a']) {
      if (y > 0 && x > 0) {
        moveUpLeft();
        setAngle(315);
      }
    } else if (keys['w'] && keys['d']) {
      if (y > 0 && x < MAP_SIZE) {
        moveUpRight();
        setAngle(45);
      }
    } else if (keys['s'] && keys['a']) {
      if (y < MAP_SIZE && x > 0) {
        moveDownLeft();
        setAngle(225);
      }
    } else if (keys['s'] && keys['d']) {
      if (y < MAP_SIZE && x < MAP_SIZE) {
        moveDownRight();
        setAngle(135);
      }
    } else if (keys['w']) {
      if (y > 0) {
        moveUp();
        setAngle(0);
      }
    } else if (keys['a']) {
      if (x > 0) {
        moveLeft();
        setAngle(270);
      }
    } else if (keys['s']) {
      if (y < MAP_SIZE) {
        moveDown();
        setAngle(180);
      }
    } else if (keys['d']) {
      if (x < MAP_SIZE) {
        moveRight();
        setAngle(90);
      }
    }
  });

  return (
    <Sprite
      angle={angle}
      image='Ship1.png'
      x={x}
      y={y}
      anchor={0.5}
      height={40}
      width={40}
    />
  );
};

const Bullet = ({ x, y, mousePos, setBullets, bullets, id, index }) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const [angle, setAngle] = useState(0);
  const calcTraj = () => {
    // Calculate the direction vector
    const direction_x = mousePos.x - CAMERA_SIZE / 2;
    const direction_y = mousePos.y - CAMERA_SIZE / 2;

    // Normalize the direction vector
    const magnitude = Math.sqrt(
      direction_x * direction_x + direction_y * direction_y
    );
    const normalized_direction_x = direction_x / magnitude;
    const normalized_direction_y = direction_y / magnitude;

    // Calculate the initial velocity components with constant speed
    const v_initial_x = BULLET_SPEED * normalized_direction_x;
    const v_initial_y = BULLET_SPEED * normalized_direction_y;
    if (bulletX > 0 && bulletX < MAP_SIZE) {
      setBulletX(bulletX + v_initial_x);
    } else {
      const newArray = bullets.splice(index, 1);
      setBullets([...bullets]);
    }
    if (bulletY > 0 && bulletY < MAP_SIZE) {
      setBulletY(bulletY + v_initial_y);
    } else {
      const newArray = bullets.splice(index, 1);
      setBullets([...bullets]);
    }
    if (normalized_direction_x > 0) {
      setAngle(Math.atan(normalized_direction_y / normalized_direction_x));
    } else {
      setAngle(
        Math.atan(normalized_direction_y / normalized_direction_x) + Math.PI
      );
    }
  };
  useTick(() => {
    calcTraj();
  });
  return (
    <Sprite
      image={'/01.png'}
      x={bulletX}
      y={bulletY}
      height={40}
      width={40}
      anchor={0.5}
      rotation={angle}
    />
  );
};

const HealthBar = () => {
  const draw = useCallback((g) => {
    g.clear();
    g.lineStyle(2, 0x0000ff, 1);
    g.beginFill(0xff700b, 1);
    g.drawRect(50, 150, 120, 120);
  }, []);
  return <Graphics draw={draw} />;
};

const Enemy = ({ enemyX, enemyY, x, y, id }) => {
  // const [enemyX, setEnemyX] = useState(initialX);
  // const [enemyY, setEnemyY] = useState(initialY);
  const moveEnemyUp = useEnemyStore((state) => state.moveEnemyUp);
  const moveEnemyDown = useEnemyStore((state) => state.moveEnemyDown);
  const moveEnemyLeft = useEnemyStore((state) => state.moveEnemyLeft);
  const moveEnemyRight = useEnemyStore((state) => state.moveEnemyRight);
  const [health, setHealth] = useState(0.5);
  const draw = useCallback((g) => {
    g.clear();
    g.lineStyle(2, 0xffffff, 1);
    g.beginFill(0xff0000, 1);
    g.drawRect(-50, 50, 100, 20);
    g.lineStyle(0, 0xfffff, 1);
    g.beginFill(0x00ff00, 1);
    g.drawRect(-50, 50, health * 100, 20);
  }, []);
  useTick(() => {
    if (enemyX > x + 100) moveEnemyLeft(id);
    if (enemyX < x - 100) moveEnemyRight(id);
    if (enemyY > y + 100) moveEnemyUp(id);
    if (enemyY < y - 100) moveEnemyDown(id);
  });
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

export const MyComponent = () => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  const enemyList = useEnemyStore((state) => state.enemyList);
  const spawnEnemy = useEnemyStore((state) => state.spawnEnemy);
  const [mousePos, setMousePos] = useState({});
  const [bullets, setBullets] = useState([]);
  const handleShoot = (e) => {
    setBullets([
      ...bullets,
      { x: playerX, y: playerY, mousePos, id: crypto.randomUUID() },
    ]);
    return;
  };

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
        // backgroundAlpha: 0.5,
        background: 'black',
      }}
      onClick={handleShoot}
    >
      <Container
        x={CAMERA_SIZE / 2}
        y={CAMERA_SIZE / 2}
        //ZOOM
        // scale={{ x: 2, y: 2 }}
        //CENTRE ON PLAYER
        pivot={{ x: playerX, y: playerY }}
      >
        {/* <Sprite
          image={
            'https://t4.ftcdn.net/jpg/01/07/76/85/360_F_107768523_jtL7cY9ajSRuTJmCfj4SAhTF8cebX317.jpg'
            // '/tiles.png'
          }
          width={700}
          height={700}
        /> */}
        <TilingSprite image={'/space.jpg'} height={MAP_SIZE} width={MAP_SIZE} />
        <Bunny x={playerX} y={playerY} />
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
              />
            );
          })}
        {/* <Enemy initialX={} y={y} /> */}
        {bullets &&
          bullets.map((bullet, index) => {
            return (
              <Bullet
                x={bullet.x}
                y={bullet.y}
                mousePos={bullet.mousePos}
                setBullets={setBullets}
                id={bullet.id}
                bullets={bullets}
                index={index}
                // key={crypto.randomUUID()}
                key={bullet.id}
              />
            );
          })}
        {/* <Bullet x={x} y={y} mousePos={mousePos} /> */}
        <Text
          text={enemyList ? enemyList.length : 'NONE'}
          anchor={0.5}
          x={150}
          y={150}
        />
      </Container>
    </Stage>
  );
};
