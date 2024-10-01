export const formatMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const newMinutes = minutes % 60;
  return `${hours}ч ${newMinutes}м`;
};
