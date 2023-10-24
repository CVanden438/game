import { keys } from '../../App';
import { MAP_SIZE } from '../../Constants';

export const PlayerMovement = ({ x, y, movePlayer, setAngle }) => {
  if (keys['w'] && keys['a']) {
    if (y > 0 && x > 0) {
      movePlayer({ moveX: -3 / Math.SQRT2, moveY: -3 / Math.SQRT2 });
      //   setAngle(315);
    }
  } else if (keys['w'] && keys['d']) {
    if (y > 0 && x < MAP_SIZE) {
      movePlayer({ moveX: 3 / Math.SQRT2, moveY: -3 / Math.SQRT2 });
      //   setAngle(45);
    }
  } else if (keys['s'] && keys['a']) {
    if (y < MAP_SIZE && x > 0) {
      movePlayer({ moveX: -3 / Math.SQRT2, moveY: 3 / Math.SQRT2 });
      //   setAngle(225);
    }
  } else if (keys['s'] && keys['d']) {
    if (y < MAP_SIZE && x < MAP_SIZE) {
      movePlayer({ moveX: 3 / Math.SQRT2, moveY: 3 / Math.SQRT2 });
      //   setAngle(135);
    }
  } else if (keys['w']) {
    if (y > 0) {
      movePlayer({ moveX: 0, moveY: -3 });
      //   setAngle(0);
    }
  } else if (keys['a']) {
    if (x > 0) {
      movePlayer({ moveX: -3, moveY: 0 });
      //   setAngle(270);
    }
  } else if (keys['s']) {
    if (y < MAP_SIZE) {
      movePlayer({ moveX: 0, moveY: 3 });
      //   setAngle(180);
    }
  } else if (keys['d']) {
    if (x < MAP_SIZE) {
      movePlayer({ moveX: 3, moveY: 0 });
      //   setAngle(90);
    }
  }
};
