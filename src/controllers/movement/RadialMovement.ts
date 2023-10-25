import { defaultMovement } from './defaultMovement';

let angle = 0; // Initialize the angle

const rotatePoint = ({ x, y, enemyX, enemyY, angleDegrees, moveEnemy, id }) => {
  // Convert angle from degrees to radians
  const angleRadians = (Math.PI / 180) * angleDegrees;

  // Calculate new coordinates
  const xNew =
    x +
    (enemyX - x) * Math.cos(angleRadians) -
    (enemyY - y) * Math.sin(angleRadians);
  const yNew =
    y +
    (enemyX - x) * Math.sin(angleRadians) +
    (enemyY - y) * Math.cos(angleRadians);

  const deltaX = xNew - enemyX;
  const deltaY = yNew - enemyY;

  return moveEnemy({ id, moveX: deltaX, moveY: deltaY });
};

function calculateMovement({
  x,
  y,
  enemyX,
  enemyY,
  angleDegrees,
  id,
  moveEnemy,
}) {
  const radius = 100; // Set the fixed radius

  // Convert angle from degrees to radians
  let angleRadians = (Math.PI / 180) * angleDegrees;

  // Calculate new coordinates
  let xRelative = enemyX - x;
  let yRelative = enemyY - y;

  let distance = Math.sqrt(xRelative * xRelative + yRelative * yRelative);
  let scale = radius / distance;

  let xNew = x + xRelative * scale;
  let yNew = y + yRelative * scale;

  // Calculate movement amounts
  let deltaX = xNew - enemyX;
  let deltaY = yNew - enemyY;

  return moveEnemy({ id, moveX: deltaX, moveY: deltaY });
}

export const radialMovement = ({
  enemyX,
  enemyY,
  x,
  y,
  id,
  speed,
  moveEnemy,
}) => {
  if (Math.sqrt((enemyX - x) ** 2 + (enemyY - y) ** 2) > 200) {
    return defaultMovement({ enemyX, enemyY, x, y, id, speed, moveEnemy });
  } else {
    return rotatePoint({
      id,
      x,
      y,
      enemyX,
      enemyY,
      moveEnemy,
      angleDegrees: 0.4 * speed,
    });
  }
};
