export const mapTo = <T, K = string | number>(
  keys: K[],
  keyFn: (rows: T) => K,
) => {
  return (rows: T[]): T[] => {
    const group = new Map(keys.map(key => [key, null]) as any);
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values()) as T[];
  };
};
