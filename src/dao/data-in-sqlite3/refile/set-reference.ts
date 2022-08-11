import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const setReference = withLazyStatic(function (
  namespace: string
, id: string
, fileHash: string
): void {
  lazyStatic(() => getDatabase().prepare(`
    INSERT OR IGNORE INTO refile_reference (namespace, id, file_hash)
    VALUES ($namespace, $id, $fileHash);
  `), [getDatabase()]).run({ namespace, id, fileHash })
})
