import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReferencesByItem = withLazyStatic(function (
  namespace: string
, id: string
): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `), [getDatabase()]).run({ namespace, id })
})
