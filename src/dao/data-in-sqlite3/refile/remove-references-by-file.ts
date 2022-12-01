import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReferencesByFile = withLazyStatic(function (fileHash: string): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE file_hash = $fileHash;
  `), [getDatabase()]).run({ fileHash })
})
