export const removeBullet = ({ id, bullets, setBullets }) => {
  const newBullets = bullets.filter((bullet) => {
    return bullet.id !== id;
  });
  setBullets(newBullets);
};
