import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllNamespaces = withLazyStatic((): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT namespace
      FROM refile_reference;
  `), [getDatabase()])
    .all() as Array<{ namespace: string }>

  return rows.map(row => row['namespace'])
})
