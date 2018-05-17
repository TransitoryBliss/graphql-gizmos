export const mapToMany = <T, K = string | number>(
  keys: K[],
  keyFn: (rows: T) => K,
) => {
  return (rows: T[]): T[] => {
    const group: any = new Map(keys.map(key => [key, []] as any));
    rows.forEach(row => (group.get(keyFn(row)) || []).push(row));
    return Array.from(group.values()) as T[];
  };
};
