import { getDatabase } from '../database'
import { withLazyStatic, lazyStatic } from 'extra-lazy'

export const removeFile = withLazyStatic(function (hash: string): void {
  lazyStatic(() => getDatabase().prepare(`
    DELETE FROM refile_file
     WHERE hash = $hash;
  `), [getDatabase()]).run({ hash })
})
