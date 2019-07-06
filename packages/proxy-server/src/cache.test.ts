import createCache from './cache';

describe('cache', () => {
  it('works', () => {
    const cache = createCache();
    cache.set('hello', 'world');
    expect(cache.get('hello')).toBe('world');
  })
});
