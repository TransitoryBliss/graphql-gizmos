export const objectCacheKeyFn = (key: any) => {
  if (key === Object(key)) {
    return JSON.stringify(
      Object.keys(key)
        .sort()
        .reduce((acc: any, val) => {
          acc[val] = key[val];
          return acc;
        }, {}),
    );
  } else {
    return key;
  }
};
