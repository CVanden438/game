import { BULLET_SPEED, CAMERA_SIZE } from '../Constants';

export const calcPlayerBulletTraj = ({ mousePos }) => {
  // Calculate the direction vector
  const directionX = mousePos.x - CAMERA_SIZE / 2;
  const directionY = mousePos.y - CAMERA_SIZE / 2;

  // Normalize the direction vector
  const magnitude = Math.sqrt(
    directionX * directionX + directionY * directionY
  );
  const normalizedDirectionX = directionX / magnitude;
  const normalizedDirectionY = directionY / magnitude;

  // Calculate the initial velocity components with constant speed
  const velocityX = BULLET_SPEED * normalizedDirectionX;
  const velocityY = BULLET_SPEED * normalizedDirectionY;
  return { velocityX, velocityY };
};
