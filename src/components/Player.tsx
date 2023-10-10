import { Sprite, useTick } from '@pixi/react';
import { usePlayerStore } from '../state/Player';
import { keys } from '../App';
import { useState } from 'react';
import { MAP_SIZE } from '../Constants';

const Player = ({ x, setX, y, setY }) => {
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

export default Player;
