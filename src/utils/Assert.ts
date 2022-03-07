/**
 * An Error class to be thrown on assertion failures
 * */
export class AssertionError extends Error {}

/**
 * Basic assertion function, throws an {@link AssertionError} if {expression} evaluates to false
 * @param expression the boolean expression to test
 * @param errorMessage optional error message to be passed to the constructor of {@link Error}
 * @throws {AssertionError}
 * @returns {null}
 */
export function assert(expression: boolean, errorMessage?: string): void {
  if(!expression) throw new AssertionError(errorMessage);
}

/**
 * Asserts that the {@link expression} is neither `null` nor `undefined`
 * @param {unknown} expression the expression to test
 * @param {string} [errorMessage] optional error message to be passed to the constructor of {@link Error}
 * @throws {AssertionError}
 * @returns {null}
 */
export function assertNotNull(expression: unknown, errorMessage?: string): void {
  if(expression === null || expression === undefined) throw new AssertionError(errorMessage);
}

/**
 * Asserts that {expected} equals {actual}
 * @param {unknown} expected the expected value
 * @param {unknown} actual the actual value
 * @throws {AssertionError}
 * @returns {null}
 */
export function assertEqual<T>(expected: T, actual: T): void {
  if(expected !== actual) throw new AssertionError(`Assertion failed: ${expected} expected, ${actual} got`);
}
