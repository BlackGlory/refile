import { getDatabase } from '../database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReferencesByNamespace = withLazyStatic(function (
  namespace: string
): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
  `), [getDatabase()]).run({ namespace })
})
