import { Cache } from '../cache';

const createCache = jest.fn().mockImplementation(() => {
  const cache: Cache = {};

  return {
    get: jest.fn().mockImplementation((key: string) => {
      return cache[key];
    }),
    set: jest.fn().mockImplementation((key, data) => {
      cache[key] = data;
    }),
  }
});

export default createCache;
