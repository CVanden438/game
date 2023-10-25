// import { create } from 'zustand';
// import { BULLET_SPEED, CAMERA_SIZE } from '../Constants';
// import EnemyBullet from '../components/EnemyBullet';

// const calcEnemyTraj = ({ playerX, playerY, enemyX, enemyY }) => {
//   // Calculate the direction vector
//   const directionX = playerX - enemyX;
//   const directionY = playerY - enemyY;

//   // Normalize the direction vector
//   const magnitude = Math.sqrt(
//     directionX * directionX + directionY * directionY
//   );
//   const normalizedDirectionX = directionX / magnitude;
//   const normalizedDirectionY = directionY / magnitude;

//   // Calculate the initial velocity components with constant speed
//   const velocityX = BULLET_SPEED * normalizedDirectionX;
//   const velocityY = BULLET_SPEED * normalizedDirectionY;
//   return { velocityX, velocityY };
// };

// export const useEnemyBulletStore = create((set) => ({
//   enemyBulletList: [],
//   fireBullet: ({ playerX, playerY, enemyX, enemyY }) => {
//     set((state) => ({
//       enemyBulletList: [
//         ...state.enemyBulletList,
//         {
//           x: enemyX,
//           y: enemyY,
//           id: crypto.randomUUID(),
//           velocityX: calcEnemyTraj({ playerX, playerY, enemyX, enemyY })
//             .velocityX,
//           velocityY: calcEnemyTraj({ playerX, playerY, enemyX, enemyY })
//             .velocityY,
//         },
//       ],
//     }));
//   },
//   removeBullet: (id) => {
//     set((state) => ({
//       enemyBulletList: state.enemyBulletList.filter((bullet) => {
//         return bullet.id !== id;
//       }),
//     }));
//   },
// }));
