import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const getAllItemIdsByNamespace = withLazyStatic((
  namespace: string
): string[] => {
  const rows = lazyStatic(() => getDatabase().prepare(`
    SELECT DISTINCT id
      FROM refile_reference
     WHERE namespace = $namespace;
  `), [getDatabase()])
    .all({ namespace }) as Array<{ id: string }>

  return rows.map(row => row['id'])
})
