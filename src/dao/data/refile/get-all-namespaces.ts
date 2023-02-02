import { getDatabase } from '../database.js'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllNamespaces = withLazyStatic(function (): Iterable<string> {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM refile_reference;
  `), [getDatabase()]).iterate() as IterableIterator<{ namespace: string }>

  return map(iter, row => row['namespace'])
})
