import { useEnemyStore } from '../../state/Enemy';

const DefaultMovement = ({ x, y, enemyX, enemyY, speed, moveEnemy, id }) => {
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

// const DefaultMovement = ({ enemyX, enemyY, x, y, id, speed, moveEnemy }) => {
//   if (enemyX > x + 100) return moveEnemy({ id, moveX: -1 * speed, moveY: 0 });
//   if (enemyX < x - 100) return moveEnemy({ id, moveX: 1 * speed, moveY: 0 });
//   if (enemyY > y + 100) return moveEnemy({ id, moveX: 0, moveY: -1 * speed });
//   if (enemyY < y - 100) return moveEnemy({ id, moveX: 0, moveY: 1 * speed });
// };

export default DefaultMovement;
