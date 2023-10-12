import { usePlayerStore } from '../state/Player';
import BigGuy from './BigGuy';
import SmallGuy from './SmallGuy';

const EnemyMapper = ({ enemyList }) => {
  const playerX = usePlayerStore((state) => state.playerX);
  const playerY = usePlayerStore((state) => state.playerY);
  return (
    <>
      {enemyList &&
        enemyList.map((enemy, index) => {
          if (enemy.data.name === 'bigGuy') {
            return (
              <BigGuy
                enemyX={enemy.x}
                enemyY={enemy.y}
                key={enemy.id}
                id={enemy.id}
                x={playerX}
                y={playerY}
                data={enemy.data}
              />
            );
          } else if (enemy.data.name === 'smallGuy') {
            return (
              <SmallGuy
                enemyX={enemy.x}
                enemyY={enemy.y}
                key={enemy.id}
                id={enemy.id}
                x={playerX}
                y={playerY}
                data={enemy.data}
              />
            );
          }
        })}
    </>
  );
};

export default EnemyMapper;
