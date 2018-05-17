# graphql-gizmos-resolve

> sattelite Provides small utility functions to help with general GraphQL development

### Installation

```bash
> npm install graphql-gizmos-resolve
```

## Functions

* [mapTo](#mapto)
* [mapToMany](#maptomany)

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

### mapToMany

Same as [mapTo](#mapto) but when you need multiple results for each ID.

```typescript
import { mapToMany } from 'graphql-gizmos-resolve';

const directorIds = ['1', '2'];

const moviesWithDirector = await getMoviesWithDirector(movieIds);
// => [{ id: 3, director_id: 2, title: 'The Godfather' }, { id: 1, director_id: 1, title: 'The Shining'} , { id: 2, director_id: 1, title: 'Full Metal Jacket' }];

mapToMany(directorIds, (movie: any) => movie.director_id)(moviesWithDirector);
// => [ [{ id: 1, director_id: 1, title: 'The Shining'} , { id: 2, director_id: 1, title: 'Full Metal Jacket' }], [{ id: 3, director_id: 2, title: 'The Godfather' }] ]
```

#### Usage with Dataloader(s)

```typescript
const movies = new DataLoader(ids =>
  getMovies(ids).then(mapTo(ids => movie.id)),
);
```

## Development

### Run tests

```
> npm run test
```
