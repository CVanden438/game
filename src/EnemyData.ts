export const enemyData = {
  bigGuy: {
    name: 'bigGuy',
    maxHealth: 20,
    health: 20,
    speed: 1,
    height: 100,
    width: 100,
    fireRate: 500,
    projWidth: 80,
    projHeight: 80,
    points: 100,
  },
  smallGuy: {
    name: 'smallGuy',
    maxHealth: 10,
    health: 10,
    speed: 2,
    height: 50,
    width: 50,
    fireRate: 200,
    projWidth: 30,
    projHeight: 50,
    points: 50,
  },
  greenGuy: {
    name: 'greenGuy',
    maxHealth: 10,
    health: 10,
    speed: 2,
    height: 80,
    width: 80,
    fireRate: 200,
    projWidth: 30,
    projHeight: 50,
    points: 50,
  },
};

export type EnemyNames = 'bigGuy' | 'smallGuy' | 'greenGuy';
export type EnemyData = typeof enemyData;
