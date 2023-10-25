import { useEnemyStore } from '../../state/Enemy';

export const defaultMovement = ({
  x,
  y,
  enemyX,
  enemyY,
  speed,
  moveEnemy,
  id,
}) => {
  const deltaX = x - enemyX;
  const deltaY = y - enemyY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const unitX = deltaX / distance;
  const unitY = deltaY / distance;
  const moveX = unitX * speed;
  const moveY = unitY * speed;
  if (distance > 200) {
    return moveEnemy({ id, moveX, moveY });
  } else if (distance < 200) {
    return moveEnemy({ id, moveX: -moveX, moveY: -moveY });
  }
};
