import { useEnemyStore } from '../../state/Enemy';

const DefaultMovement = ({ enemyX, enemyY, x, y, id, speed, moveEnemy }) => {
  if (enemyX > x + 100) return moveEnemy({ id, moveX: -1 * speed, moveY: 0 });
  if (enemyX < x - 100) return moveEnemy({ id, moveX: 1 * speed, moveY: 0 });
  if (enemyY > y + 100) return moveEnemy({ id, moveX: 0, moveY: -1 * speed });
  if (enemyY < y - 100) return moveEnemy({ id, moveX: 0, moveY: 1 * speed });
};

export default DefaultMovement;
