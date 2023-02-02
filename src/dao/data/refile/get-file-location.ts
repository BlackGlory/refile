import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getFileLocation = withLazyStatic(function (hash: string): string | null {
  const row = lazyStatic(() => getDatabase().prepare(`
    SELECT location
      FROM refile_file
     WHERE hash = $hash;
  `), [getDatabase()]).get({ hash }) as { location: string | null } | undefined

  if (row) {
    return row['location']
  } else {
    return null
  }
})
