import { Structures } from '../Structures';
import { EnemyState } from '../state/Enemy';
type CalcCollision = {
  bulletX: number;
  bulletY: number;
  enemyList: EnemyState['enemyList'];
  damageEnemy: (id: string) => void;
};

export const calcPlayerBulletCollision = ({
  enemyList,
  bulletX,
  bulletY,
  damageEnemy,
}: CalcCollision) => {
  let collision = false;
  for (const i of enemyList) {
    if (
      bulletX > i.x - i.data.width / 2 &&
      bulletX < i.x + i.data.width / 2 &&
      bulletY > i.y - i.data.height / 2 &&
      bulletY < i.y + i.data.height / 2
    ) {
      collision = true;
      damageEnemy(i.id);
    }
  }
  for (const i of Structures) {
    if (
      bulletX > i.x - i.width / 2 &&
      bulletX < i.x + i.width / 2 &&
      bulletY > i.y - i.height / 2 &&
      bulletY < i.y + i.height / 2
    ) {
      collision = true;
    }
  }
  return collision;
};
