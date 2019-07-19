export function omit<T extends { [key: string]: unknown }>(
  object: T,
  paths: string[]
): T {
  return Object.keys(object)
    .filter(key => !paths.includes(key))
    .reduce(
      (prev, curr) => {
        return { ...prev, [curr]: object[curr] };
      },
      {} as T
    );
}
