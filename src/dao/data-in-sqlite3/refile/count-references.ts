import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const countReferences = withLazyStatic(function (fileHash: string): number {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT COUNT(*) AS count
      FROM refile_reference
     WHERE file_hash = $fileHash;
  `), [getDatabase()]).get({ fileHash })

  return row['count']
})
