export function assertNever(message: string): never {
  throw new TypeError(message);
}
