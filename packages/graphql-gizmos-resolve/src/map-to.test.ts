import { mapTo } from './map-to';

describe('mapTo', () => {
  test('sorts output', () => {
    const source = [{ id: '3' }, { id: '1' }, { id: '2' }];
    const expected = [{ id: '1' }, { id: '2' }, { id: '3' }];
    expect(mapTo(['1', '2', '3'], (data: any) => data.id)(source)).toEqual(
      expected,
    );
  });
});
