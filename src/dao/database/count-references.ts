import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const countReferences = withLazyStatic((fileHash: string): number => {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT COUNT(*) AS count
      FROM refile_reference
     WHERE file_hash = $fileHash;
  `), [getDatabase()]).get({ fileHash }) as { count: number }

  return row['count']
})
