import { getDatabase } from '@src/database.js'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllNamespaces = withLazyStatic((): Iterable<string> => {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM refile_reference;
  `), [getDatabase()])
    .iterate() as IterableIterator<{ namespace: string }>

  return map(iter, row => row['namespace'])
})
