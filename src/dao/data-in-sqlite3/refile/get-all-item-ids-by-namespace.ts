import { getDatabase } from '../database'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIdsByNamespace = withLazyStatic(function (
  namespace: string
): Iterable<string> {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT id
      FROM refile_reference
     WHERE namespace = $namespace;
  `), [getDatabase()]).iterate({ namespace })

  return map(iter, row => row['id'])
})
