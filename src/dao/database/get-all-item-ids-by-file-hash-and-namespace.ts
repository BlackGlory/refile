import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIdsByFileHashAndNamespace = withLazyStatic((
  fileHash: string
, namespace: string
): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT id
      FROM refile_reference
     WHERE file_hash = $fileHash
       AND namespace = $namespace;
  `), [getDatabase()])
    .all({ namespace, fileHash }) as Array<{ id: string }>

  return rows.map(row => row['id'])
})
