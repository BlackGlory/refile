import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeReferencesByItemId = withLazyStatic((
  namespace: string
, id: string
): void => {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_reference
     WHERE namespace = $namespace
       AND id = $id;
  `), [getDatabase()])
    .run({ namespace, id })
})
