import { create } from 'zustand';
import { enemyData } from '../EnemyData';
import { MAP_SIZE } from '../Constants';
import { usePlayerStore } from './Player';
import { EnemyData } from '../EnemyData';

type EnemyTypes = Array<'bigGuy' | 'smallGuy' | 'greenGuy'>;

const randomEnemy = () => {
  const strings: EnemyTypes = ['bigGuy', 'smallGuy', 'greenGuy'];
  const randomIndex = Math.floor(Math.random() * strings.length);
  return strings[randomIndex];
};

export type EnemyState = {
  enemyList: Array<{
    x: number;
    y: number;
    id: string;
    data: EnemyData['bigGuy'];
  }>;
  spawnEnemy: () => void;
  damageEnemy: (id: string) => void;
  moveEnemy: ({
    id,
    moveX,
    moveY,
  }: {
    id: string;
    moveX: number;
    moveY: number;
  }) => void;
  killEnemy: ({ id, score }: { id: string; score: number }) => void;
};

export const useEnemyStore = create<EnemyState>((set, get) => ({
  enemyList: [],
  spawnEnemy: () => {
    const x = Math.random() * MAP_SIZE;
    const y = Math.random() * MAP_SIZE;
    const id = crypto.randomUUID();
    const type = randomEnemy();
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
