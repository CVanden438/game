import { Stage, Sprite, useTick, Container } from '@pixi/react';
import { Color, Graphics } from 'pixi.js';
import { useEffect, memo, useState } from 'react';

const keys = { w: false, a: false, s: false, d: false };

const handleKeyDown = (e) => {
  keys[e.key] = true;
};

const handleKeyUp = (e) => {
  keys[e.key] = false;
};

const BULLET_SPEED = 3;

const Bunny = ({ x, setX, y, setY }) => {
  useTick(() => {
    if (keys['w']) if (y > 0) setY(y - 3);
    if (keys['a']) if (x > 0) setX(x - 3);
    if (keys['s']) if (y < 700) setY(y + 3);
    if (keys['d']) if (x < 700) setX(x + 3);
  });

  return (
    <Sprite
      image='https://pixijs.io/pixi-react/img/bunny.png'
      x={x}
      y={y}
      anchor={0.5}
    />
  );
};

const Bullet = ({ x, y, mousePos, setBullets, bullets, id, index }) => {
  const [bulletX, setBulletX] = useState(x);
  const [bulletY, setBulletY] = useState(y);
  const calcTraj = () => {
    // Calculate the direction vector
    const direction_x = mousePos.x - 350;
    const direction_y = mousePos.y - 350;

    // Normalize the direction vector
    const magnitude = Math.sqrt(
      direction_x * direction_x + direction_y * direction_y
    );
    const normalized_direction_x = direction_x / magnitude;
    const normalized_direction_y = direction_y / magnitude;

    // Calculate the initial velocity components with constant speed
    const v_initial_x = BULLET_SPEED * normalized_direction_x;
    const v_initial_y = BULLET_SPEED * normalized_direction_y;

    if (bulletX > 0 && bulletX < 700) {
      setBulletX(bulletX + v_initial_x);
    } else {
      const newArray = bullets.splice(index, 1);
      setBullets([...bullets]);
    }
    if (bulletY > 0 && bulletY < 700) {
      setBulletY(bulletY + v_initial_y);
    } else {
      const newArray = bullets.splice(index, 1);
      setBullets([...bullets]);
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
    />
  );
};

const Enemy = ({ initialX, initialY, x, y }) => {
  const [enemyX, setEnemyX] = useState(initialX);
  const [enemyY, setEnemyY] = useState(initialY);
  useTick(() => {
    if (enemyX > x) setEnemyX(enemyX - 1);
    if (enemyX < x) setEnemyX(enemyX + 1);
    if (enemyY > y) setEnemyY(enemyY - 1);
    if (enemyY < y) setEnemyY(enemyY + 1);
  });
  return (
    <Sprite
      image='https://pixijs.io/pixi-react/img/bunny.png'
      x={enemyX}
      y={enemyY}
      height={100}
      width={100}
      anchor={0.5}
    />
  );
};

export const MyComponent = () => {
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [mousePos, setMousePos] = useState({});
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([
    { initialX: 100, initialY: 100 },
    { initialX: 200, initialY: 200 },
    { initialX: 300, initialY: 300 },
  ]);
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
  });
  return (
    <Stage
      width={700}
      height={700}
      options={{
        backgroundAlpha: 0.5,
        background: 'red',
      }}
      onClick={handleShoot}
    >
      <Container
        x={350}
        y={350}
        //ZOOM
        // scale={{ x: 2, y: 2 }}
        //CENTRE ON PLAYER
        pivot={{ x: playerX, y: playerY }}
      >
        <Sprite
          image={
            'https://t4.ftcdn.net/jpg/01/07/76/85/360_F_107768523_jtL7cY9ajSRuTJmCfj4SAhTF8cebX317.jpg'
          }
          width={700}
          height={700}
        />
        <Bunny x={playerX} y={playerY} setX={setPlayerX} setY={setPlayerY} />
        {enemies.map((enemy, index) => {
          return (
            <Enemy
              initialX={enemy.initialX}
              initialY={enemy.initialY}
              key={index}
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
      </Container>
    </Stage>
  );
};
