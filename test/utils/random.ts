export function randomInt(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min) + min);
}
