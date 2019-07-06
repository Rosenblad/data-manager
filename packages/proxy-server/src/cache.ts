export interface Cache {
  [key: string]: any;
}

export default function createCache() {
  const cache: Cache = {};

  return {
    get: (key: string) => cache[key],
    set: (key: string, data: any): void => cache[key] = data,
  }
}
