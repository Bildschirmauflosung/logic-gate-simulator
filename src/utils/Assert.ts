export class AssertionError extends Error {}

export function assert(expression: boolean, errorMessage?: string): void {
  if(!expression) throw new AssertionError(errorMessage);
}

export function assertNotNull(expression: unknown, errorMessage?: string): void {
  if(expression === null) throw new AssertionError(errorMessage);
}

export function assertEqual<T>(expected: T, actual: T): void {
  if(expected !== actual) throw new AssertionError(`Assertion failed: ${expected} expected, ${actual} got`);
}
