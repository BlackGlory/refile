import { getDatabase } from '@src/database.js'
import { isntNull } from '@blackglory/prelude'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeAllUnreferencedFiles = withLazyStatic((): string[] => {
  const rows = lazyStatic(() =>
    getDatabase()
      .prepare(`
        DELETE FROM refile_file
         WHERE NOT EXISTS(SELECT 1 FROM refile_reference WHERE file_hash = hash)
        RETURNING location
      `)
  , [getDatabase()])
    .all() as Array<{ location: string | null }>

  return rows
    .map(x => x['location'])
    .filter(isntNull)
})
