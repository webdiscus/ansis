/**
 * Clone the pure function.
 * The function should not contain external dependencies or variables.
 *
 * @param {Function} fn
 * @returns {Function}
 */
export const clonePureFunction = (fn) => new Function('return ' + fn.toString())();

/**
 * Create array of uniq instances for the fixture function.
 *
 * @param {array} vendors Any array contains the number of libraries to be tested.
 *   The only thing that matters is the number of elements in the array.
 * @param {Function} fn The `pure function` of the fixture.
 *   The `pure function` must not contain external dependencies such as variables or other functions.
 *   All dependencies must be passed through function arguments. It is very important.
 * @returns {Function[]} The array of uniq instances.
 */
export const createFixture = (vendors, fn) => {
  const fixture = [];
  vendors.forEach(() => fixture.push(new Function('return ' + fn.toString())()));

  return fixture;
};
