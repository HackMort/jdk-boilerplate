/**
 * The function generates a random number between 0 and 100 using the current date as a seed.
 * @returns The function is generating a random number between 0 and 99 (inclusive) and returning it as
 * an integer.
 */
export function generateRandomNumber() {
  const seed = Date.now()
  return Math.floor(Math.random() * 100) + 1 + seed
}
