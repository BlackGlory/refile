import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReferencesByNamespace = withLazyStatic((
  namespace: string
): void => {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
  `), [getDatabase()])
    .run({ namespace })
})
