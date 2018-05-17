# graphql-gizmos-resolve

> Utilities for writing `GraphQL` resolvers

### Installation

```bash
> npm install graphql-gizmos-resolve
```

## Functions

* [mapTo](#mapto)
* [mapToMany](#maptomany)
* [objectCacheKeyFn](#objectcachekeyfn)

### mapTo

Sorts a list of output with a list of input using a comparator function.

```typescript
import { mapTo } from 'graphql-gizmos-resolve';

const ids = ['1', '2', '3'];

const movies = await getMovies(ids);
// => [{ id: 3, title: '2001: a space odyssey' }, { id: 1, title: 'The Shining' }, { id: 2, title: 'Full Metal Jacket' }]

mapTo(ids, (movie: any) => movie.id)(movies);
// => [{ id: 1, title: 'The Shining' }, { id: 2, title: 'Full Metal Jacket' }, { id: 3, title: '2001: a space odyssey' }]
```

#### Usage with Dataloader(s)

```typescript
const movies = new DataLoader(ids =>
  getMovies(ids).then(mapTo(ids => movie.id)),
);
```

### mapToMany

Same as [mapTo](#mapto) but when you need multiple results for each ID.

```typescript
import { mapToMany } from 'graphql-gizmos-resolve';

const directorIds = ['1', '2'];

const moviesWithDirector = await getMoviesByDirectorId(directorIds);
// => [{ id: 3, director_id: 2, title: 'The Godfather' }, { id: 1, director_id: 1, title: 'The Shining'} , { id: 2, director_id: 1, title: 'Full Metal Jacket' }];

mapToMany(directorIds, (movie: any) => movie.director_id)(moviesWithDirector);
// => [ [{ id: 1, director_id: 1, title: 'The Shining'} , { id: 2, director_id: 1, title: 'Full Metal Jacket' }], [{ id: 3, director_id: 2, title: 'The Godfather' }] ]
```

#### Usage with Dataloader(s)

```typescript
const movies = new DataLoader(ids =>
  getMoviesByDirector(directorIds).then(
    mapToMany(directorIds, movie => movie.director_id),
  ),
);
```

### objectCacheKeyFn

Sometimes using a simple string is not enough as a key for a `DataLoader`. Pass this function when initializing your `DataLoader` to add
support for using an `Object`.

Imagine you want to get all the movies a director has directed with specific actors:

```typescript
const directorActors = new DataLoader(input => {
  const clause = input.reduce((acc: any, item) => {
    if (!acc.directorId) {
      acc.directorId = item.directorId;
    }
    acc.actorIds = [...acc.actorIds, item.actorId];
    return acc;
  }, { directorId: null, actorIds: [] });

  return runDbClause(clause).then(mapToMany(clause.actorIds, i => i.actorId));
}, { cacheKeyFn: objectCacheKeyFn });

// ... somewhere in a resolver
directorActors.load({ directorId: 1, actorId: 1 });

// ... another resolver
directorActors.load({ directorId: 1, actorId: 2 });

// ... when it's finally executed a clause will have been created and only executed once:
{
  directorId: 1,
  actorIds: [1, 2]
}
```

## Development

### Run tests

```
> npm run test
```
