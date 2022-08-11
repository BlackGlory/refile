import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReference = withLazyStatic(function (
  namespace: string
, id: string
, fileHash: string
): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id
       AND file_hash = $fileHash;
  `), [getDatabase()]).run({ namespace, id, fileHash })
})
