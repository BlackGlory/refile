import { getDatabase } from '@src/database.js'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeFile = withLazyStatic((hash: string): void => {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_file
     WHERE hash = $hash;
  `), [getDatabase()])
    .run({ hash })
})
