import { Sprite, useTick } from '@pixi/react';
import { usePlayerStore } from '../../state/Player';
import { keys } from '../../App';
import { useState } from 'react';
import { CAMERA_SIZE, MAP_SIZE } from '../../Constants';
import { playerMovement } from '../../controllers/movement/playerMovement';

const calcAngle = ({ mousePos, setAngle }) => {
  const directionX = mousePos.x - CAMERA_SIZE / 2;
  const directionY = mousePos.y - CAMERA_SIZE / 2;
  let angle;
  if (directionX > 0) {
    angle = Math.atan(directionY / directionX);
  } else {
    angle = Math.atan(directionY / directionX) + Math.PI;
  }
  setAngle(angle);
};

const Player = ({ x, y, mousePos }) => {
  const movePlayer = usePlayerStore((state) => state.movePlayer);
  const [angle, setAngle] = useState(0);
  useTick(() => {
    playerMovement({
      x,
      y,
      movePlayer,
      setAngle,
    });
    calcAngle({ mousePos, setAngle });
  });

  return (
    <Sprite
      rotation={angle + Math.PI / 2}
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
