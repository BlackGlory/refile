import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllFileHashesByItemId = withLazyStatic((
  namespace: string
, id: string
): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT file_hash
      FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `), [getDatabase()])
    .all({ namespace, id }) as Array<{ file_hash: string }>

  return rows.map(row => row['file_hash'])
})
