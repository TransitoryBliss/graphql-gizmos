import { mapToMany } from './map-to-many';

describe('mapToMany', () => {
  test('sorts output', () => {
    const source = [
      { id: '2', child_id: '1' },
      { id: '1', child_id: '1' },
      { id: '1', child_id: '4' },
      { id: '3', child_id: '5' },
    ];
    const expected = [
      [{ id: '1', child_id: '1' }, { id: '1', child_id: '4' }],
      [{ id: '2', child_id: '1' }],
    ];
    expect(mapToMany(['1', '2'], (data: any) => data.id)(source)).toEqual(
      expected,
    );
  });
});
