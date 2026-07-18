/**
 * Wraps a number between min and max values.
 * Useful for infinite scroll animations like marquees.
 * 
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @param {number} v - The value to wrap.
 * @returns {number} The wrapped value.
 */
export const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
