import { getDatabase } from '@src/database.js'
import { map } from 'iterable-operator'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllFileHashesByItemId = withLazyStatic((
  namespace: string
, id: string
): Iterable<string> => {
  const iter = lazyStatic(() => getDatabase().prepare(`
    SELECT file_hash
      FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `), [getDatabase()])
    .iterate({ namespace, id }) as Iterable<{ file_hash: string }>

  return map(iter, row => row['file_hash'])
})
