import { objectCacheKeyFn } from './object-cache-key-fn';

describe('objectCacheKeyFn', () => {
  test('returns key if not an object', () => {
    expect(objectCacheKeyFn('1')).toBe('1');
  });

  test('stringifies and sorts object', () => {
    const sorted = { val1: 'val1', val2: 'val2' };
    const unsorted = { val2: 'val2', val1: 'val1' };
    expect(objectCacheKeyFn(sorted)).toEqual(JSON.stringify(sorted));
    expect(objectCacheKeyFn(unsorted)).toEqual(JSON.stringify(sorted));
  });
});
