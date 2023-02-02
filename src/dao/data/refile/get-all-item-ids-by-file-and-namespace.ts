import { getDatabase } from '../database.js'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIdsByFileAndNamespace = withLazyStatic(function (
  fileHash: string
, namespace: string
): Iterable<string> {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT id
      FROM refile_reference
     WHERE file_hash = $fileHash
       AND namespace = $namespace;
  `), [getDatabase()]).iterate({ namespace, fileHash })

  return map(iter, row => row['id'])
})
