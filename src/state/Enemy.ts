import { create } from 'zustand';
import enemyData from '../EnemyData';

export const useEnemyStore = create((set) => ({
  enemyList: [
    { x: 100, y: 100, id: 1020, data: enemyData.bigGuy },
    { x: 110, y: 110, id: 2222, data: enemyData.smallGuy },
  ],
  spawnEnemy: () => {
    const x = Math.random() * 5000;
    const y = Math.random() * 5000;
    const id = crypto.randomUUID();
    set((state) => ({
      enemyList:
        state.enemyList.length < 10
          ? [
              ...state.enemyList,
              {
                x,
                y,
                id,
                data: enemyData.bigGuy,
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
  killEnemy: () => {
    set((state) => ({
      enemyList: state.enemyList.filter((enemy) => enemy.data.health > 0.1),
    }));
  },
}));
