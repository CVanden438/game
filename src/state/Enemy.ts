import { create } from 'zustand';

export const useEnemyStore = create((set) => ({
  enemyList: [
    { x: 100, y: 100, id: 1020, health: 1 },
    { x: 200, y: 200, id: 2222, health: 1 },
  ],
  spawnEnemy: () => {
    const x = Math.random() * 5000;
    const y = Math.random() * 5000;
    const id = crypto.randomUUID();
    const health = 1;
    set((state) => ({
      enemyList:
        state.enemyList.length < 10
          ? [...state.enemyList, { x, y, id, health }]
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
        enemy.id === id ? { ...enemy, health: enemy.health - 0.1 } : enemy
      ),
    }));
  },
  killEnemy: () => {
    set((state) => ({
      enemyList: state.enemyList.filter((enemy) => enemy.health > 0.1),
    }));
  },
}));
