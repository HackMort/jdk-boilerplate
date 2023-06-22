/**
 * The function generates a random number between 0 and 100 using the current date as a seed.
 * @returns The function is generating a random number between 0 and 99 (inclusive) and returning it as
 * an integer.
 */
export function generateRandomNumber () {
  const seed = Date.now()
  return Math.floor(Math.random() * 100) + 1 + seed
}

/**
 * The function checks if a given value is an object.
 * @param object - The parameter "object" is a variable that represents any value that is being passed
 * into the function. In this case, the function is checking whether the value passed in is an object
 * or not.
 * @returns The function `isObject` is returning a boolean value. It returns `true` if the input
 * `object` is not `null` and its type is `object`, and `false` otherwise.
 */
export function isObject (object) {
  return object != null && typeof object === 'object'
}

/**
 * The function merges two objects by replacing values in the first object with corresponding values
 * from the second object, and adding any new key-value pairs from the second object to the first
 * object.
 * @param baseObject - The first object to be merged.
 * @param updateObject - The second object that needs to be merged with the first object (obj1).
 * @returns An object containing `obj1` and `obj2`.
 */
export function mergeObjects (baseObject, updateObject) {
  if (!baseObject || !updateObject) return null

  for (const key in baseObject) {
    const val1 = baseObject[key]
    const val2 = updateObject[key]

    const areObjects = isObject(val1) && isObject(val2)

    if (areObjects) mergeObjects(val1, val2)

    if (!areObjects && val2 !== undefined) baseObject[key] = val2
  }

  for (const key in updateObject) {
    const val1 = baseObject[key]
    const val2 = updateObject[key]

    if (val1 === undefined) baseObject[key] = val2
  }

  return { ...baseObject }
}
