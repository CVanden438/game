import { create } from 'zustand';
import enemyData from '../EnemyData';
import { MAP_SIZE } from '../Constants';
import { usePlayerStore } from './Player';

export const useEnemyStore = create((set, get) => ({
  enemyList: [
    // { x: 100, y: 100, id: 1020, data: enemyData.bigGuy },
    // { x: 110, y: 110, id: 2222, data: enemyData.smallGuy },
  ],
  spawnEnemy: () => {
    const x = Math.random() * MAP_SIZE;
    const y = Math.random() * MAP_SIZE;
    const id = crypto.randomUUID();
    let type = 'bigGuy';
    const rand = Math.random();
    rand < 0.5 ? (type = 'bigGuy') : (type = 'smallGuy');
    set((state) => ({
      enemyList:
        state.enemyList.length < 10
          ? [
              ...state.enemyList,
              {
                x,
                y,
                id,
                data: enemyData[type],
              },
            ]
          : [...state.enemyList],
    }));
  },
  moveEnemyLeft: (id) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id ? { ...enemy, x: enemy.x - 1 } : enemy
      ),
    }));
  },
  moveEnemyRight: (id) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id ? { ...enemy, x: enemy.x + 1 } : enemy
      ),
    }));
  },
  moveEnemyUp: (id) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id ? { ...enemy, y: enemy.y - 1 } : enemy
      ),
    }));
  },
  moveEnemyDown: (id) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id ? { ...enemy, y: enemy.y + 1 } : enemy
      ),
    }));
  },
  damageEnemy: (id) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id
          ? {
              ...enemy,
              data: {
                ...enemy.data,
                health: enemy.data.health - 1,
              },
            }
          : enemy
      ),
    }));
    const targetEnemy = get().enemyList.filter((enemy) => enemy.id === id);
    if (targetEnemy[0].data.health === 0) {
      get().killEnemy({ id, score: targetEnemy[0].data.points });
    }
  },
  moveEnemy: ({ id, moveX, moveY }) => {
    set((state) => ({
      enemyList: state.enemyList.map((enemy) =>
        enemy.id === id
          ? { ...enemy, x: enemy.x + moveX, y: enemy.y + moveY }
          : enemy
      ),
    }));
  },
  killEnemy: ({ id, score }) => {
    set((state) => ({
      enemyList: state.enemyList.filter((enemy) => enemy.id !== id),
    }));
    usePlayerStore.getState().addScore(score);
  },
}));
