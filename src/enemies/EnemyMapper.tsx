import { EnemyNames } from '../EnemyData';
import { usePlayerStore } from '../state/Player';
import { BigGuy } from './BigGuy';
import { GreenGuy } from './GreenGuy';
import { SmallGuy } from './SmallGuy';

const enemyMap = {
  bigGuy: BigGuy,
  smallGuy: SmallGuy,
  greenGuy: GreenGuy,
};

const EnemySelector = ({ enemyName, ...props }: { enemyName: EnemyNames }) => {
  const SelectedEnemy = enemyMap[enemyName];
  return <SelectedEnemy {...props} />;
};

const EnemyMapper = ({ enemyList }) => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  return (
    <>
      {enemyList &&
        enemyList.map((enemy, index) => {
          return (
            <EnemySelector
              enemyName={enemy.data.name}
              enemyX={enemy.x}
              enemyY={enemy.y}
              key={enemy.id}
              id={enemy.id}
              x={playerX}
              y={playerY}
              data={enemy.data}
            />
          );
        })}
    </>
  );
};

export default EnemyMapper;
